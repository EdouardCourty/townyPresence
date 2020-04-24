const utils = require("../data/utils");

module.exports = (client, message) => {
  // Listening condition
  message.isListened = true;
  message.isCommand  = message.content.startsWith(process.env.COMMAND_PREFIX) ? 1 : 0;
  // User-specific listening condition
  const isSentByUser = true;

  if (!message.isListened && !message.isCommand) return;

  message.args        = message.content.split(" ");
  message.fullArgs    = message.args;
  message.commandName = message.isCommand ? message.args.shift().slice(1) : undefined;
  message.baseContent = message.isCommand ? message.content : undefined;
  message.content     = message.isCommand ? message.args.join(" ") : message.content;

  if (message.isCommand && isSentByUser) utils.runCommand(client, message);

  if (!client.lastDidEcho) utils.log(message);
};