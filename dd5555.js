function startNewDoc() {
      document.getElementById("editorContainer").style.display = "block";
      document.getElementById("editor").innerHTML = "Type your DD Text here!";
      document.getElementById("filename").value = "Untitled doc.ddtxt";
    }

    function saveDoc() {
     const content = document.getElementById("editor").innerHTML;
  let filename = document.getElementById("filename").value.trim();

  // Ensure filename ends with .ddtxt
  if (!filename || !filename.match(/\.(ddtxt|dha)$/i)) {
    filename = (filename || "Untitled") + ".ddtxt";
  }

  // Create a Blob and trigger download
  const blob = new Blob([content], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  // Append to body and trigger click
  document.body.appendChild(a);
  a.click();

  // Clean up
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

    document.getElementById("fileInput").addEventListener("change", function () {
      const file = this.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("editorContainer").style.display = "block";
        document.getElementById("editor").innerHTML = e.target.result;
        document.getElementById("filename").value = file.name;
      };
      reader.readAsText(file);
    });
