const fs = require("fs");
const EmbedSender = require("../classes/EmbedSender");

exports.run = async (client, message, args) => {
  let playerName = args[0];
  if (!playerName) {
    return EmbedSender.sendSimpleEmbed(
      message.channel,
      "Unable to perform this action.",
      "Please provide a player name to be removed from the safelist",
      "info"
    );
  }
  let safelist = require("../config/safelist");

  if (!safelist.players.includes(playerName)) {
    return message.channel.send(`${playerName} is not registered in the safelist`);
  }
  safelist.players.splice(safelist.players.indexOf(playerName), 1);
  fs.writeFileSync("./config/safelist.json", JSON.stringify(safelist, null, 2));

  await message.channel.send(`Removed ${playerName} from the safelist.`);
};

exports.info = {
  name: "RemoveSafe",
  description: "Removes a player from the safelist.",
  commandExample: "!removesafe PHP_Sensei"
};