exports.run = async (client, message) => {
  /** @type Array */
  let safelist = require("../safelist");

  await message.channel.send(`**The players that are in the safelist are:**
 · ${safelist.join("\n · ")}`);
};

exports.info = {
  name       : "listsafe",
  description: "List all the players that are in the safelist."
};