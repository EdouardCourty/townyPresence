module.exports = (timestamp, data) => {
  /** @type {Array} */
  const checkList = require("../checklist.json");
  
  let onlinePlayers = data.data.players;

  let filtered = onlinePlayers.filter(player => {
    return checkList.includes(player.name)
  });

  return filtered.length > 0
    ? `Online players: \n > ${filtered.map(n => n.name).join(",\n > ")}`
    : "No monitored player online."
};
