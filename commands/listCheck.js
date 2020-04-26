exports.run = (client, message, args) => {
  /** @type Array */
  let checklist = require("../checklist");

  message.channel.send(`**The players that are in the checklist are:**
 · ${checklist.join("\n · ")}`);
};

exports.info = {
  name       : "listcheck",
  description: "List all the players that are in the checklist."
};