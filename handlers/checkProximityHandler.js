const checkCoordinates = require("../lib/checkPlayersCoordinates");

module.exports = (timestamp, data) => {
  /** @type {Array} */
  const safeList = require("../config/safelist.json");

  let newData = {
    "timestamp": timestamp,
    "players": checkCoordinates(data.data.players).filter(p => {
      let keep = p != null;
      keep = keep ? !safeList.includes(p.playerName) : keep;
      return keep
    })
  };

  newData.playerCount = newData.players.length;

  return newData.playerCount === 0
      ? `No foreign player found in the claimed zone.`
      : `Found ${newData.playerCount} players in monitored zones:\n > ${newData.players.map(p => `${p.playerName} - ${p.zoneName}`).join(",\n > ")}`;
};