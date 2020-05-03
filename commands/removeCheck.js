const fs = require("fs");

exports.run = async (client, message, args) => {
  let playerName = args[0];
  if (!playerName) {
    return message.channel.send("Please specify a username.");
  }
  /** @type Array */
  let checkList = require("../config/checklist");
  delete checkList[checkList.indexOf(playerName)];
  fs.writeFileSync("./checklist.json", JSON.stringify(checkList, null, 2));

  await message.channel.send(`Removed ${playerName} from the checklist.`);
};

exports.info = {
  name       : "RemoveCheck",
  description: "Removes a player from the checklist.",
  commandExample: "!removecheck PHP_Sensei"
};