exports.run = (client, message, args) => {
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
  name       : "delete",
  description: "Deletes a specified amount of messages."
};