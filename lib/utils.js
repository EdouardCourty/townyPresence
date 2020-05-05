require("colors");
const EmbedSender = require("../classes/EmbedSender");
const {MASTER_USER_ID} = require("../config/config.json");

module.exports = {
  /**
   * Logs the given message regarding the logLevel specified in the .env file
   * @param { Object } message
   */
  log: (message) => {
    switch (process.env.APPLICATION_LOGLEVEL) {
      case "all":
        console.log(
          message.isCommand
            ? `Command executed - Name: ${message.commandName} - Arguments: ${message.fullArgs || "none"}`
            : `Message by ${message.author.tag} - ${message.content}`
        );
      break;
      case "messagesOnly":
        if (!message.isCommand) console.log(`Message by ${message.author.tag} - ${message.content}`);
      break;
      case "commandsOnly":
        if (message.isCommand) console.log(`Command executed - Name: ${message.commandName} - Arguments: ${message.fullArgs || "none"}`);
      break;
    }
  },
  /**
   * Runs the command regarding the `message.commandName` property.
   * @param {Object} client
   * @param {Object} message
   * @param {Boolean} authorized
   */
  runCommand: async (client, message, authorized) => {
    message.delete();
    if (!client.availableCommands.includes(message.commandName)) return;
    const authorId = parseInt(message.author.id);

    if (authorized || authorId === MASTER_USER_ID) {
      return client.commands.get(message.commandName).run(client, message, message.args);
    } else {
      await message.channel.send({
        embed: EmbedSender.getNotAuthorizedEmbed()
      })
    }
  },

  /**
   * Returns an Edouard formatted date (lol)
   * @return {String}
   */
  getDate : () => {
    const dt = new Date();
    return `${
      (dt.getMonth()+1).toString().padStart(2, '0')}/${
      dt.getDate().toString().padStart(2, '0')}/${
      dt.getFullYear().toString().padStart(4, '0')} ${
      dt.getHours().toString().padStart(2, '0')}:${
      dt.getMinutes().toString().padStart(2, '0')}:${
      dt.getSeconds().toString().padStart(2, '0')}`
  }
};