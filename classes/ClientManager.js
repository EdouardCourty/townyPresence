const fs = require("fs");
require("colors");
const Broadcaster = require("./Broadcaster");
const WhitelistManager = require("./WhitelistManager");

class ClientManager {
  broadcaster;
  whitelistManager;
  client;

  constructor(client) {
    console.log(`Building the client...`.blue);
    this.client = client;

    this.broadcaster = new Broadcaster();
    this.whitelistManager = new WhitelistManager();
  }

  login() {
    this.client.login(process.env.APPLICATION_TOKEN)
      .then(() => {
        console.log("Connection to Discord established, listening.".green);
      })
      .catch(e => {
        console.log(`Unable to log in. Login token is wrong or the API is unreachable.\n${e}`.red);
      });
  }

  loadEvents()  {
    console.log(" > Loading events...".yellow);
    fs.readdirSync("./events")
      .forEach(file => {
        const event = require(`../events/${file}`);
        let eventName = file.split(".")[0];
        this.client.on(eventName, event.bind(null, this.client));
      });
  }

  loadCommands() {
    console.log(" > Loading commands...".yellow);
    this.client.commands = new Map();
    fs.readdirSync("./commands")
      .forEach(file => {
        let command = require(`../commands/${file}`);
        let commandName = command.info.name.toLowerCase();
        this.client.commands.set(commandName, command);
      });
    this.client.availableCommands = [...this.client.commands.keys()];
  }
}

module.exports = ClientManager;