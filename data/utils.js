require("colors");
const fs = require("fs");
const axios = require("axios");

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
        let commandName = command.info.name;
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
   * @param { Object } client
   * @param { Object } message
   */
  runCommand: (client, message) => {
    message.delete();
    if (!client.availableCommands.includes(message.commandName)) return;
    client.commands.get(message.commandName).run(client, message, message.args);
  },
  /**
   * Gets a specified amount of messages in a given channel.
   * @param channel
   * @param limit
   * @return {Promise<Object>}
   */
  getMessages : (channel, limit) => {
    limit = limit > 100 ? 100 : limit;
    return new Promise(async (resolve, reject) => {
      let index = 0, messages = [];
      const nbFetches = Math.ceil(limit / 100);
      for (let i = 0; i < nbFetches; i++) {
        const msgs = await channel.fetchMessages({
          limit: 100,
          before: index || null
        });
        messages = messages.concat(msgs.array());
        index = messages[messages.length - 1].id;
        console.log(nbFetches, messages.length, index);
        if (msgs.size < 100) {
          console.log("The loop finished early");
          break;
        }
      }
      console.log(messages);
      resolve(messages);
    });
  },

  /**
   * Returns an Edouard formatted date (lol)
   * @return { string }
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
  },
  /**
   * Returns the latest file in a folder using the timestamp present the file name.
   * @param { string } folder
   * @return { string }
   */
  getLatestFileInFolder : (folder) => {
    const regExp = /\d+/g;
    const fileNames = fs.readdirSync(folder).filter(file => file.endsWith(".json"));
    const timeStamps = fileNames.map(file => parseInt(file.match(regExp).toString()));

    return fileNames.filter(f => f.includes(Math.max(...timeStamps).toString())).toString();
  },

  /**
   *
   * @param { string } tag
   */
  addFriend : (tag) => {
    let arr = tag.split("#");
    let username = arr[0], discriminator = arr[1];

    const AUTHORIZATION = process.env.APPLICATION_TOKEN;
    const AUTHORITY = "discordapp.com";
    const ACCEPT_LANGUAGE = "en";
    const REFERER = "https://discordapp.com/channels/@me";
    const ACCEPT = "/";
    const ORIGIN = "https://discordapp.com";
    const CONTENT_TYPE = "application/json";
    const SEC_FETCH_SITE = "same-origin";
    const SEC_FETCH_MODE = "cors";
    const ACCEPT_ENCODING = "gzip, deflate, br";
    // The two following values and Base64 encoded data, can be easily decoded and rewritten, but these will work fine.
    // I'm not goint to explain what's inside, decode it by yourself if you wanna know, these are not user-specific tho.
    const X_SUPER_PROPERTIES = "eyJvcyI6IkxpbnV4IiwiYnJvd3NlciI6IkRpc2NvcmQgQ2xpZW50IiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X3ZlcnNpb24iOiIwLjAuMTAiLCJvc192ZXJzaW9uIjoiNS4zLjAtNDItZ2VuZXJpYyIsIm9zX2FyY2giOiJ4NjQiLCJ3aW5kb3dfbWFuYWdlciI6IlVuaXR5LHVidW50dSIsImRpc3RybyI6IlVidW50dSAxOC4wNC40IExUUyIsImNsaWVudF9idWlsZF9udW1iZXIiOjU4MjAyLCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==";
    const X_CONTEXT_PROPERTIES = "eyJsb2NhdGlvbiI6IkFkZCBGcmllbmQifQ==";
    const USER_AGENT = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.10 Chrome/78.0.3904.130 Electron/7.1.11 Safari/537.36";
    const COOKIE = "__cfduid=dda634e90e6b60cf29395164c44545d181586162405; __cfruid=7d60776d4c10590caf28882ecc80b763b6ae6922-1587051166; locale=fr";

    const HEADERS = {
      "authority": AUTHORITY,
      "x-super-properties": X_SUPER_PROPERTIES,
      "x-context-properties": X_CONTEXT_PROPERTIES,
      "accept-language": ACCEPT_LANGUAGE,
      "user-agent": USER_AGENT,
      "content-type": CONTENT_TYPE,
      "authorization": AUTHORIZATION,
      "origin": ORIGIN,
      "accept": ACCEPT,
      "sec-fetch-site": SEC_FETCH_SITE,
      "sec-fetch-mode": SEC_FETCH_MODE,
      "referer": REFERER,
      "accept-encoding": ACCEPT_ENCODING,
      "cookie": COOKIE
    };
    const BODY = {
      "username": username,
      "discriminator": discriminator
    };
    return BODY;
  }
};