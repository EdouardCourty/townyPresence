exports.run = (client, message, args) => {
  if (!args[0]) {
    return message.channel.send("Please specify a number of messages to delete.");
  }
  let toDelete = parseInt(args[0]) + 1;
  message.channel.send(`Deleting ${toDelete} messages.`)
    .then(message => {
      message.channel.bulkDelete(toDelete)
        .then(async () => {
          await message.delete();
        })
    })
};

exports.info = {
  name: "Delete",
  description: "Deletes a specified amount of messages.",
  commandExample: "!delete 10"
};