const PlayerCoordinates = require("../classes/PlayerCoordinates");
const MonitoredZone = require("../classes/MonitoredZone");

const zone = new MonitoredZone({
  "name": "New_Cayenne",
  "leftX": -10032,
  "rightX": -9890,
  "topZ": -1183,
  "bottomZ": -1025
})

module.exports = (timestamp, data) => {
  /** @type {Array} */
  const safeList = require("../config/safelist.json");

  data.data.players.push({
    x: -9960,
    z: -1100,
    name: "TestUserName"
  })

  let newData = {
    "timestamp": timestamp,
    "players": data.data.players.map(player => {
      const playerCoords = new PlayerCoordinates(player);
      if (MonitoredZone.isPlayerInZone(playerCoords, zone)) {
        player.zone = zone;
        return player
      }
    }).filter(p => {
      let keep = p != null;
      keep = keep ? !safeList.includes(p.playerName) : keep;
      return keep
    })
  };

  newData.playerCount = newData.players.length;

  return newData.playerCount === 0
      ? `No foreign player found in the claimed zone.`
      : `Found ${newData.playerCount} players in monitored zones:\n > ${newData.players.map(p => `${p.name} - ${zone.name}`).join(",\n > ")}`;
};