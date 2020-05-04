const utils = require("../lib/utils");
const fs = require("fs");

module.exports = async (client, message) => {
  // Listening condition
  message.isListened = true;
  message.isCommand  = message.content.startsWith(process.env.COMMAND_PREFIX) ? 1 : 0;
  let userIsAdmin = message.member.hasPermission("ADMINISTRATOR");
  // User-specific listening condition
  const isSentByUser = message.author.bot === false;

  const serverId = parseInt(message.guild.id);
  /** @type Array<Number> */
  const authorizedwhitelist = require("../config/whitelist").ids;
  const isServerAuthorized = authorizedwhitelist.includes(serverId);

  if (!message.isListened && !message.isCommand) return;

  message.args        = message.content.split(" ");
  message.fullArgs    = message.args;
  message.commandName = message.isCommand ? message.args.shift().slice(1).toLowerCase() : undefined;
  message.baseContent = message.isCommand ? message.content : undefined;
  message.content     = message.isCommand ? message.args.join(" ") : message.content;

  if (message.isCommand && isSentByUser && userIsAdmin) {
    await utils.runCommand(client, message, isServerAuthorized);
  }
  utils.log(message);
};