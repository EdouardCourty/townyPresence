exports.run = async (client, message) => {
  /** @type Array */
  let safelist = require("../config/safelist");

  await message.channel.send({
    embed: {
      title: "safelist.json",
      description: "All the users that are not monitored.",
      color: 2613284,
      fields: [
        {
          name: "Players",
          value: ` > ${safelist.join("\n > ")}`
        }
      ]
    }
  });
};

exports.info = {
  name       : "SafeList",
  description: "List all the players that are in the safelist.",
  commandExample: "!safelist"
};