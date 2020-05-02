exports.run = async (client, message) => {
  /** @type Array */
  let safelist = require("../config/safelist");

  await message.channel.send(`**The players that are in the safelist are:**
 · ${safelist.join("\n · ")}`);
};

exports.info = {
  name       : "safelist",
  description: "List all the players that are in the safelist.",
  commandExample: "!safelist"
};