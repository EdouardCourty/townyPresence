const Broadcaster = require("../classes/Broadcaster");
const EmbedSender = require("../classes/EmbedSender");

exports.run = async (client, message, args) => {
  const command = args[0];
  const username = args[1];
  const serverId = parseInt(message.guild.id);
  switch(command) {
    case "show":
      Broadcaster.getSafelist(serverId, message.channel);
      break;
    case "add":
      Broadcaster.addUserToSafelist(serverId, message.channel, username);
      break;
    case "remove":
      Broadcaster.removeUserFromSafelist(serverId, message.channel, username);
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
  name: "SafeList",
  description: "List all the players that are in the safelist.",
  commandExample: "!safelist"
};