const fs = require("fs");

exports.run = async (client, message, args) => {
  let playerName = args[0];
  if (!playerName) {
    return message.channel.send("Please specify a username.");
  }
  /** @type Array */
  let checkList = require("../config/checklist");
  if (checkList.includes(playerName)) {
    return message.channel.send(`${playerName} is already registered in the checklist`);
  }
  checkList.push(playerName);
  fs.writeFileSync("./checklist.json", JSON.stringify(checkList, null, 2));

  await message.channel.send(`Added ${playerName} to the checklist.`);
};

exports.info = {
  name       : "AddCheck",
  description: "Adds a player to the checklist.",
  commandExample: "!addcheck PHP_Sensei"
};