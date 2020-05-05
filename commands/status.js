const Broadcaster = require("../classes/Broadcaster");

exports.run = async (client, message) => {
  const serverId = parseInt(message.guild.id);

  Broadcaster.getStatus(serverId, message.channel)
};

exports.info = {
  name: "Status",
  description: "Checks the status for the current monitor.",
  commandExample: "!status"
};