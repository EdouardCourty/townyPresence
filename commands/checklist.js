exports.run = async (client, message) => {
  /** @type Array */
  let checklist = require("../config/checklist");

  await message.channel.send(`**The players that are in the checklist are:**
 · ${checklist.join("\n · ")}`);
};

exports.info = {
  name       : "Checklist",
  description: "List all the players that are in the checklist.",
  commandExample: "!checklist"
};