const Broadcaster = require("../classes/Broadcaster");
const EmbedSender = require("../classes/EmbedSender");

exports.run = async (client, message, args) => {
  const command = args[0];
  const username = args[1];
  const serverId = parseInt(message.guild.id);
  switch (command) {
    case "show":
      Broadcaster.getChecklist(serverId, message.channel);
      break;
    case "add":
      Broadcaster.addUserToChecklist(serverId, message.channel, username);
      break;
    case "remove":
      Broadcaster.removeUserFromChecklist(serverId, message.channel, username);
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
  name: "Checklist",
  description: "List all the players listed in the checklist.",
  commandExample: "!checklist"
};