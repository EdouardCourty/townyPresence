const fs = require("fs");

module.exports = (timestamp, data) => {
  /** @type {Array} */
  const safeList = require("../safelist.json");

  let newData = {
    "timestamp": timestamp,
    "players": data.data.players.map(player => {
      if (player.x > -10100 && player.x < -9900 && player.z > -1200 && player.z < -1050) {
        return player
      }
    }).filter(p => {
      let keep = p != null;
      keep = keep ? !safeList.includes(p.name) : keep;
      return keep
    })
  };

  newData.playerCount = newData.players.length;

  return newData.playerCount === 0
      ? `No foreign player found in the claimed zone.`
      : `Found ${newData.playerCount} players in the claimed zone:\n > ${newData.players.map(p => p.name).join(",\n > ")}`;
};