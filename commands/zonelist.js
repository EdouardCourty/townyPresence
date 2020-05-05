exports.run = async (client, message) => {
  /** @type Array */
  let zoneList = require("../config/zones.json");
  zoneList = zoneList.map(z => z.name);

  await message.channel.send({
    embed: {
      title: "zones.json",
      description: "All the monitored zones.",
      color: 14925577,
      fields: [
        {
          name: "Zones",
          value: ` > ${zoneList.join("\n > ")}`
        }
      ]
    }
  });
};

exports.info = {
  name: "ZoneList",
  description: "List all the zones registered on the zones.json file.",
  commandExample: "!zonelist"
};