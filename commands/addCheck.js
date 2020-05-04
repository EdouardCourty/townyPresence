const fs = require("fs");
const EmbedSender = require("../classes/EmbedSender");

exports.run = async (client, message, args) => {
  let playerName = args[0];
  if (!playerName) {
    return EmbedSender.sendSimpleEmbed(
      message.channel,
      "Unable to perform this action.",
      "Please provide a player name to be added to the checklist",
      "info"
    );
  }
  const checklist = require("../config/checklist.json");
  if (checklist.players.includes(playerName)) {
    return message.channel.send(`${playerName} is already registered in the checklist.`);
  }
  checklist.players.push(playerName);
  fs.writeFileSync("./config/checklist.json", JSON.stringify(checklist, null, 2));

  await message.channel.send(`Added ${playerName} to the checklist.`);
};

exports.info = {
  name       : "AddCheck",
  description: "Adds a player to the checklist.",
  commandExample: "!addcheck PHP_Sensei"
};