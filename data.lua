local Players = game:GetService("Players")
local DataStore = game:GetService("DataStoreService"):GetDataStore("TsunamiBrainrot")

local MarketplaceService = game:GetService("MarketplaceService")

local productFunctions = {}

local function PlayerJoined(Player)

	local leaderstats = Instance.new("Folder",Player)
	leaderstats.Name = "leaderstats"

	local Money = Instance.new("NumberValue",leaderstats)
	Money.Name = "Money"
	Money.Value = DataStore:GetAsync("Money"..Player.UserId) or 0
end

local function PlayerRemoved(Player)
	local leaderstats = Player:WaitForChild("leaderstats")

	local Money = leaderstats:WaitForChild("Money")

	DataStore:SetAsync("Money"..Player.UserId,Money.Value)
end

local function StudioSave()
	wait(0.7)
end

Players.PlayerAdded:Connect(PlayerJoined)
Players.PlayerRemoving:Connect(PlayerRemoved)
game:BindToClose(StudioSave)
