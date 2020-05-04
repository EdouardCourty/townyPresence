const fs = require("fs");

exports.run = async (client, message, args) => {
  let serverID = parseInt(args[0]);
  if (!serverID) {
    return message.channel.send("Please specify a username.");
  }

  const authorizedwhitelist = require("../config/whitelist");
  
  if (!authorizedwhitelist.ids.includes(serverID)) {
    return message.channel.send(`${serverID} is not registered in the whitelist`);
  }
  authorizedwhitelist.ids.splice(authorizedwhitelist[authorizedwhitelist.ids.indexOf(serverID) - 1], 1)
  fs.writeFileSync("./config/whitelist.json", JSON.stringify(authorizedwhitelist, null, 2));

  await message.channel.send(`Removed ${serverID} from the safelist.`);
};

exports.info = {
  name       : "RemoveWhitelist",
  description: "Removes a player from the checklist.",
  commandExample: "!removewhitelist 12064654564678"
};