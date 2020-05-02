const Discord = require("discord.js");
const utils   = require("./lib/utils.js");
require("dotenv").config();

let client = new Discord.Client();

utils.login(client);
utils.loadCommands(client);
utils.loadEvents(client);
