exports.run = async (client, message, args) => {
  await message.channel.send({
    embed: {
      color: 3236556,
      title: "Help panel",
      fields: Array.from(client.commands.keys()).map(key => {
        const commandInfo = client.commands.get(key).info;
        return {
          name: `__**${commandInfo.name}**__`,
          value: `${commandInfo.description}\n\`${commandInfo.commandExample}\``,
          inline: true
        }
      })
    }
  })
};

exports.info = {
  name       : "Help",
  description: "Gives information about the commands this bot can launch.",
  commandExample: "!help"
};
