const Broadcaster = require("../classes/Broadcaster");

exports.run = (client, message) => {
  const serverId = parseInt(message.guild.id);

  Broadcaster.stopMonitor(serverId, message.channel);
};

exports.info = {
  name: "StopMonitor",
  description: "Stops the monitor for the server the command is executed in.",
  commandExample: "!stopmonitor"
};