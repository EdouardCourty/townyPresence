const fs = require("fs");

exports.run = (client, message, args) => {
  let playerName = args[0];
  if (!playerName) {
    return message.channel.send("Please specify a username.");
  }
  /** @type Array */
  let checkList = require("../checklist");
  checkList.push(playerName);
  fs.writeFileSync("./checklist.json", JSON.stringify(checkList, null, 2));

  message.channel.send(`Added ${playerName} to the checklist.`);
};

exports.info = {
  name       : "addCheck",
  description: "Adds a player to the checklist."
};