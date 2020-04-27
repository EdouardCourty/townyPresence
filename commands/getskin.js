exports.run = async (client, message, args) => {
  let playerName = args[0];
  if (!playerName) {
    return message.channel.send("Please specify a username.");
  }
  const REQUEST_URL = `https://minotar.net/armor/body/${playerName}/200.png`;
  await message.channel.send({files: [REQUEST_URL]})
};

exports.info = {
  name       : "getskin",
  description: "Adds a player to the checklist.",
  commandExample: "!addcheck PHP_Sensei"
};