const fs = require("fs");

exports.run = async (client, message, args) => {
  let serverID = parseInt(args[0]);
  if (!serverID) {
    return message.channel.send("Please specify a server ID.");
  }

  const authorizedwhitelist = require("../config/whitelist");

  if (authorizedwhitelist.ids.includes(serverID)) {
    return message.channel.send(`${serverID} is already registered in the whitelist.`);
  }
  authorizedwhitelist.ids.push(serverID);
  fs.writeFileSync("./config/whitelist.json", JSON.stringify(authorizedwhitelist, null, 2));

  await message.channel.send(`Added ${serverID} to the whitelist.`);
};

exports.info = {
  name       : "AddWhitelist",
  description: "Adds a player to the checklist.",
  commandExample: "!addwhitelist 12064654564678"
};