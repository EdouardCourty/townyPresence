const Broadcaster = require("../classes/Broadcaster");

exports.run = (client, message) => {
  const serverId = parseInt(message.guild.id);

  Broadcaster.getMonitor(serverId, message.channel);
};

exports.info = {
  name: "GetMonitor",
  description: "Brings back the monitos in case it scrolled up.",
  commandExample: "!getmonitor"
};