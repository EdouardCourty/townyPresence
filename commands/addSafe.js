const fs = require("fs");

exports.run = async (client, message, args) => {
  let playerName = args[0];
  if (!playerName) {
    return message.channel.send("Please specify a username.");
  }
  /** @type Array */
  let checkList = require("../safelist");
  checkList.push(playerName);
  fs.writeFileSync("./safelist.json", JSON.stringify(checkList, null, 2));

  await message.channel.send(`Added ${playerName} to the safelist.`);
};

exports.info = {
  name       : "addSafe",
  description: "Adds a player to the safelist."
};