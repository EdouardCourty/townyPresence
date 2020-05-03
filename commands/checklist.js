exports.run = async (client, message) => {
  /** @type Array */
  let checklist = require("../config/checklist");

  await message.channel.send({
    embed: {
      title: "safelist.json",
      description: "All the users that are not monitored.",
      fields: [
        {
          name: "Players",
          value: ` > ${checklist.join("\n > ")}`
        }
      ]
    }
  });
};

exports.info = {
  name       : "Checklist",
  description: "List all the players that are in the checklist.",
  commandExample: "!checklist"
};