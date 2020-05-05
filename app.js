const Discord = require("discord.js");
const utils   = require("./lib/utils.js");
const Broadcaster = require("./classes/Broadcaster");

require("dotenv").config();

let client = new Discord.Client();

utils.login(client);
utils.loadCommands(client);
utils.loadEvents(client);

const broadcaster = new Broadcaster();