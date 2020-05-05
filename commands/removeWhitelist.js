const fs = require("fs");
const EmbedSender = require("../classes/EmbedSender");

exports.run = async (client, message, args) => {
  let serverID = parseInt(args[0]);
  if (!serverID) {
    return EmbedSender.sendSimpleEmbed(
      message.channel,
      "Unable to perform this action.",
      "Please provide a player name to be removed from the whitelist",
      "info"
    );
  }
  const authorizedwhitelist = require("../config/whitelist");
  
  if (!authorizedwhitelist.ids.includes(serverID)) {
    return message.channel.send(`${serverID} is not registered in the whitelist`);
  }
  authorizedwhitelist.ids.splice(authorizedwhitelist.ids.indexOf(serverID), 1)
  fs.writeFileSync("./config/whitelist.json", JSON.stringify(authorizedwhitelist, null, 2));

  await message.channel.send(`Removed ${serverID} from the safelist.`);
};

exports.info = {
  name: "RemoveWhitelist",
  description: "Removes a player from the checklist.",
  commandExample: "!removewhitelist 12064654564678"
};