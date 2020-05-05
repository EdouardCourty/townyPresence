const fs = require("fs");
const EmbedSender = require("../classes/EmbedSender");

exports.run = async (client, message, args) => {
  let playerName = args[0];
  if (!playerName) {
    return EmbedSender.sendSimpleEmbed(
      message.channel,
      "Unable to perform this action.",
      "Please provide a player name to be removed from the checklist",
      "info"
    );
  }
  let checkList = require("../config/checklist");

  if (!checkList.players.includes(playerName)) {
    return message.channel.send(`${playerName} is not registered in the checklist`);
  }
  checkList.players.splice(checkList.players.indexOf(playerName), 1);
  fs.writeFileSync("./config/checklist.json", JSON.stringify(checkList, null, 2));

  await message.channel.send(`Removed ${playerName} from the checklist.`);
};

exports.info = {
  name: "RemoveCheck",
  description: "Removes a player from the checklist.",
  commandExample: "!removecheck PHP_Sensei"
};