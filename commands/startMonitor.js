const Broadcaster = require("../classes/Broadcaster");

exports.run = async (client, message) => {
  const serverID = parseInt(message.guild.id);

  Broadcaster.registerMonitor(serverID, message.channel);
}

exports.info = {
  name: "startMonitor",
  description: "Starts monitoring with the coufig bount to the server the command is executed in.",
  commandExample: "!startmonitor"
}
