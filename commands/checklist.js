exports.run = async (client, message) => {
  let checklist = require("../config/checklist");

  await message.channel.send({
    embed: {
      title: "checklist.json",
      description: "All the users that are not monitored.",
      color: 14689319,
      fields: [
        {
          name: "Players",
          value: ` > ${checklist.players.join("\n > ")}`
        }
      ]
    }
  });
};

exports.info = {
  name: "Checklist",
  description: "List all the players that are in the checklist.",
  commandExample: "!checklist"
};