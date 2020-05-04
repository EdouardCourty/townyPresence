const fs = require("fs");
const EmbedSender = require("../classes/EmbedSender");

exports.run = async (client, message, args) => {
  let playerName = args[0];
  if (!playerName) {
    return EmbedSender.sendSimpleEmbed(
      message.channel,
      "Unable to perform this action.",
      "Please provide a player name to be added to the safelist",
      "info"
    );
  }
  const safelist = require("../config/safelist");
  if (safelist.players.includes(playerName)) {
    return message.channel.send(`${playerName} is already registered in the safelist.`);
  }
  safelist.players.push(playerName);
  fs.writeFileSync("./config/safelist.json", JSON.stringify(safelist, null, 2));

  await message.channel.send(`Added ${playerName} to the safelist.`);
};

exports.info = {
  name       : "AddSafe",
  description: "Adds a player to the safelist.",
  commandExample: "!addsafe PHP_Sensei"
};