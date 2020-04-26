exports.run = async (client, message) => {
  /** @type Array */
  let checklist = require("../checklist");

  await message.channel.send(`**The players that are in the checklist are:**
 · ${checklist.join("\n · ")}`);
};

exports.info = {
  name       : "listcheck",
  description: "List all the players that are in the checklist."
};