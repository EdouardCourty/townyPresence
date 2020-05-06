const Broadcaster = require("../classes/Broadcaster");
const EmbedSender = require("../classes/EmbedSender");

exports.run = async (client, message, args) => {
  const command = args[0];
  const serverId = parseInt(message.guild.id);
  switch (command) {
    case "status":
      Broadcaster.getStatus(serverId, message.channel)
      break;
    case "start":
      Broadcaster.registerMonitor(serverId, message.channel);
      break;
    case "stop":
      Broadcaster.stopMonitor(serverId, message.channel);
      break;
    default:
      await EmbedSender.sendSimpleEmbed(
        message.channel,
        "An error occured.",
        "The provided argument is not bound to an action. Please retry.",
        "warning"
      )
  }
};

exports.info = {
  name: "Monitor",
  description: "Has three subcommands: `status`, `start`, `stop`",
  commandExample: "!monitor <status|start|stop>"
};