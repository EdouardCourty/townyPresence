exports.run = (client, message, args) => {
  /** @type Array */
  let safelist = require("../safelist");

  message.channel.send(`**The players that are in the safelist are:**
 · ${safelist.join("\n · ")}`);
};

exports.info = {
  name       : "listsafe",
  description: "List all the players that are in the safelist."
};