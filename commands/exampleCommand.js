exports.run = (client, message, args) => {
  // Here goes your code
  message.channel.send("Example command launched.");
};

exports.info = {
  name       : "exampleCommand",
  description: "This is an example."
};