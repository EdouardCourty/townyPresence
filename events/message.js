const utils = require("../lib/utils");
const Whitelist = require("../models/Whitelist");

module.exports = async (client, message) => {
  if (message.author.bot) return;
  const whitelistedServerIds = (await Whitelist.findOne()).servers
  // Listening condition
  message.isCommand = message.content.startsWith(process.env.COMMAND_PREFIX);
  let userIsAdmin = message.member.hasPermission("ADMINISTRATOR");
  if (!userIsAdmin) return;

  let isServerWhitelisted = false;
  const serverId = parseInt(message.guild.id);
  isServerWhitelisted = whitelistedServerIds.includes(serverId)

  if (!message.isCommand) return;

  message.args = message.content.split(" ");
  message.fullArgs = message.args;
  message.commandName = message.args.shift().slice(1).toLowerCase();
  message.baseContent = message.content;
  message.content = message.args.join(" ");

  await utils.runCommand(client, message, isServerWhitelisted);
  utils.log(message);
};