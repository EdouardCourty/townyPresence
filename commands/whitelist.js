const WhitelistManager = require("../classes/WhitelistManager");
const EmbedSender = require("../classes/EmbedSender");

exports.run = async (client, message, args) => {
  const command = args[0];
  const serverId = parseInt(args[1]);
  switch (command) {
    case "show":
      WhitelistManager.getWhitelist(message.channel);
      break;
    case "add":
      WhitelistManager.addServerIdToWhitelist(serverId, message.channel)
      break;
    case "remove":
      WhitelistManager.removeServerIdFromWhitelist(serverId, message.channel)
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
  name: "Whitelist",
  description: "List all the whitelisted server IDs.",
  commandExample: "!whitelist"
};
