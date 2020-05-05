exports.run = (client, message, args) => {
  if (!args[0] || args[0] > 99 || args[0] < 1) {
    return message.channel.send("Please specify a number of messages to delete, between 1 and 99");
  }
  let toDelete = parseInt(args[0]) + 1;
  message.channel.send(`Deleting ${toDelete} messages.`)
    .then(async message => {
      await message.channel.bulkDelete(toDelete)
    })
};

exports.info = {
  name: "Delete",
  description: "Deletes a specified amount of messages.",
  commandExample: "!delete 10"
};