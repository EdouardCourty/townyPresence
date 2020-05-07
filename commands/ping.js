const EmbedSender = require("../classes/EmbedSender");

exports.run = async (client, message) => {
  let ping = Date.now() - message.createdTimestamp;
  await message.channel.send({
    embed: {
      title: "Bot latency information",
      color: EmbedSender.COLOR_INFO,
      fields: [
        {
          name: "Bot R/S latency",
          value: `${ping} ms`
        },
        {
          name: "Discord API Latency",
          value: `${client.ping} ms`
        }
      ],
      footer: new Date(Date.now() + 7200)
    }
  })
};

exports.info = {
  name: "Ping",
  description: "Returns the bot and API latency.",
  commandExample: "!ping"
};