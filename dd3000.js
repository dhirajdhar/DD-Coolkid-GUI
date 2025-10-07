function signup() {
      const username = document.getElementById('signup-username').value;
      const password = document.getElementById('signup-password').value;
      const firstname = document.getElementById('firstname').value;
      const lastname = document.getElementById('lastname').value;
      const profilepic = "https://static.wixstatic.com/media/14115b_b46f94cbfc7643e8aadcb80b6de7f946~mv2.png/v1/fill/w_44,h_40,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/dduser.png";
      const ddpoints = 0;

      fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, profilepic, firstname, lastname, ddpoints })
      }).then(res => res.json()).then(data => {
        if (data.success) alert('Account created!');
        else alert(data.error);
      });
    }

    function login() {
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;

      fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      }).then(res => res.json()).then(data => {
        if (data.success) {
          const profilepic = data.profilepic;
          const fname = data.firstname;
          const lname = data.lastname;
          const ddpoints = data.ddpoints;
          document.getElementById('auth-ui').style.display = 'none';
          document.getElementById('mail-ui').style.display = 'block';
          if (username.endsWith("@dhar.dd")) {
            document.getElementById('user-email').innerHTML = "<img width=15 height=15 src='" + profilepic + "'><b>" + fname + " " + lname + "</b> - " + username + " | <img src="https://raw.githubusercontent.com/dhirajdhar/DD-Coolkid-GUI/refs/heads/main/DD%20Points%20Logo.png" width=20 height=20></img> " + ddpoints;
            document.getElementById('testusername').innerText = username - "@dhar.dd";
          } else {
            document.getElementById('user-email').innerHTML = "<img width=15 height=15 src='" + profilepic + "'><b>" + fname + " " + lname + "</b> - " + username + "@dhar.dd | <img src="https://raw.githubusercontent.com/dhirajdhar/DD-Coolkid-GUI/refs/heads/main/DD%20Points%20Logo.png" width=20 height=20></img> " + ddpoints;
            document.getElementById('testusername').innerText = username;
          }
          document.getElementById('ddpoints2').innerText = "DD Points (D$): " + ddpoints;
          document.body.style.background = "#ffffff";
        } else {
          alert(data.error);
        }
      });
    }

    function logout() {
      fetch('/logout', { method: 'POST' }).then(() => {
        document.getElementById('auth-ui').style.display = 'block';
        document.getElementById('mail-ui').style.display = 'none';
        document.body.style.background = "#323232";
      });
    }

    function sendEmail() {
      const to = document.getElementById('to').value;
      const subject = document.getElementById('subject').value;
      const body = document.getElementById('body').innerHTML;

      fetch('/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, body })
      }).then(res => res.json()).then(data => {
        alert('Email sent!');
        cancelcompose();
      });
    }

    function loadInbox() {
  fetch('/inbox')
    .then(res => res.json())
    .then(emails => {
      const inboxDiv = document.getElementById('inbox');
      inboxDiv.innerHTML = emails.map((email, index) =>
        `<div id="email-${index}">
          <img width=15 height=15 src="${email.profilepic}"><strong>${email.firstname} ${email.lastname}</strong><br>
          <strong><font color="blue">${email.subject}</font></strong>
          <p>
            <button onclick='viewEmail("${email.from}","${email.firstname}","${email.lastname}","${email.subject}","${email.body}","${email.profilepic}")'>🔎</button>
            <button style="background: #323232;" onclick="deleteEmail(${index})">🗑️</button>
            <button style="background: #323232;">🚩</button>
          </p>
          <hr>
        </div>`
      ).join('');
    });
}


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }

function compose() {
  document.getElementById("ddchatcreator").style.display = "block";
  document.getElementById("inboxframe").style.display = "none";
  document.getElementById("viewemail").style.display = "none";
}

function cancelcompose() {
  document.getElementById("ddchatcreator").style.display = "none";
  document.getElementById("inboxframe").style.display = "block";
  document.getElementById("viewemail").style.display = "block";
  document.getElementById("to").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("body").value = "";
  loadInbox();
}

function opensettings() {
  document.getElementById("configs").style.display = "block";
  document.getElementById("mail-ui").style.display = "none";
}

function closesettings() {
  document.getElementById("configs").style.display = "none";
  document.getElementById("mail-ui").style.display = "block";
  loadInbox();
}

function changePassword() {
  const oldPassword = document.getElementById('oldpassword').value;
  const newPassword = document.getElementById('newpassword').value;
  const username = document.getElementById('testusername').innerText // however you store it

  fetch('/change-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, oldPassword, newPassword })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("🔐 Password updated successfully!");
    } else {
      alert("❌ " + data.error);
    }
  });
}

function changeFullname() {
  const fname = document.getElementById('newfirstname').value;
  const lname = document.getElementById('newlastname').value;
  const username = document.getElementById('testusername').innerText // however you store it

  fetch('/change-name', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, fname, lname })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("🔐 Full name updated successfully!");
    } else {
      alert("❌ " + data.error);
    }
  });
}

function changeProfilepic() {
  const profileimg = document.getElementById('profileimg').value;
  const username = document.getElementById('testusername').innerText // however you store it

  fetch('/change-pic', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, profileimg })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("🔐 Profile picture updated successfully!");
    } else {
      alert("❌ " + data.error);
    }
  });
}

function ddInspect() {
  fetch('/inspect', {
    method: 'POST',
    credentials: 'include'
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      alert("❌ " + data.error);
    } else {
      document.getElementById('inspect-output').style.display = "block";
      document.getElementById('inspect-output').textContent =
        JSON.stringify(data.users, null, 2);
    }
  });
}
function closeInspect() {
  document.getElementById('inspect-output').style.display = "none";
}

function deleteEmail(index) {
  fetch('/delete-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index }),
    credentials: 'include'
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      document.getElementById(`email-${index}`).remove();
    } else {
      alert("❌ " + data.error);
    }
  });
}

function viewEmail(from, fname, lname, subject, body, profilepic) {
  document.getElementById('viewemail').innerHTML = `
    <h2><strong>${subject}</strong></h2>
    <p><strong><img src="${profilepic}" width=15 height=15> ${fname} ${lname} (${from})</strong></p>
    <p>${body}</p>
  `;
}

setInterval(loadInbox, 500);
