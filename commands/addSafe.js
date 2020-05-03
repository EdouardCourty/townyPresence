const fs = require("fs");

exports.run = async (client, message, args) => {
  let playerName = args[0];
  if (!playerName) {
    return message.channel.send("Please specify a username.");
  }
  /** @type Array */
  let safelist = require("../config/safelist");
  if (safelist.includes(playerName)) {
    return message.channel.send(`${playerName} is already registered in the safelist`);
  }
  safelist.push(playerName);
  fs.writeFileSync("./safelist.json", JSON.stringify(safelist, null, 2));

  await message.channel.send(`Added ${playerName} to the safelist.`);
};

exports.info = {
  name       : "AddSafe",
  description: "Adds a player to the safelist.",
  commandExample: "!addsafe PHP_Sensei"
};