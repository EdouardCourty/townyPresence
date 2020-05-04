const fs = require("fs");

exports.run = async (client, message) => {
  const authorizedwhitelist = require("../config/whitelist").ids;

  await message.channel.send({
    embed: {
      title: "whitelist.json",
      description: "All the servers that are whitelisted.",
      color: 35071,
      fields: [
        {
          name: "Servers",
          value: ` > ${authorizedwhitelist.join("\n > ")}`
        }
      ]
    }
  });
}

exports.info = {
  name       : "Whitelist",
  description: "List all the whitelisted server IDs.",
  commandExample: "!whitelist"
};
