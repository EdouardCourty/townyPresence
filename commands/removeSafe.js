const fs = require("fs");

exports.run = (client, message, args) => {
  let playerName = args[0];
  if (!playerName) {
    return message.channel.send("Please specify a username.");
  }
  /** @type Array */
  let safelist = require("../safelist");
  delete safelist[safelist.indexOf(playerName)];
  fs.writeFileSync("./checklist.json", JSON.stringify(safelist, null, 2));

  message.channel.send(`Removed ${playerName} from the safelist.`);
};

exports.info = {
  name       : "removesafe",
  description: "Removes a player from the safelist."
};