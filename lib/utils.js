require("colors");
const fs = require("fs");
const EmbedSender = require("../classes/EmbedSender");

module.exports = {
  /**
   * Connects the client to the Discord API, using the token provided in the .env file
   * @param client
   */
  login: (client) => {
    client.login(process.env.APPLICATION_TOKEN)
      .then(() => {
        console.log("Connected to Discord.".green);
      })
      .catch(e => {
        console.log(`Unable to log in. Login token is wrong or the API is unreachable.\n${e}`.red);
      });
  },
  /**
   * Load all the existing commands in the `/commands` directory.
   * @param client
   */
  loadCommands: (client) => {
    console.log("Loading commands...".yellow);
    client.commands = new Map();
    fs.readdirSync("./commands")
      .forEach(file => {
        console.log(` > ${file} loaded !`);
        let command = require(`../commands/${file}`);
        let commandName = command.info.name.toLowerCase();
        client.commands.set(commandName, command);
      });
    client.availableCommands = [...client.commands.keys()];
  },
  /**
   * Load all the existing events in the `/events` directory.
   * @param client
   */
  loadEvents: (client) => {
    console.log("Loading events...".yellow);
    fs.readdirSync("./events")
      .forEach(file => {
        console.log(` > ${file} loaded !`);
        const event   = require(`../events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
      });
    console.log(`Preparing the client...`.blue);
  },
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

    if (authorized) {
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