const Discord = require("discord.js");
const mongoose = require("mongoose");

const ClientManager = require("./classes/ClientManager");

const {MONGODB_CONNECTION_STRING} = require("./config/config.json");
require("dotenv").config();

let client = new Discord.Client();

const clientManager = new ClientManager(client);
clientManager.login();
clientManager.loadEvents();
clientManager.loadCommands();

mongoose.connect(MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
    console.log(" > Connection to MongoDB established.")
  }).catch((e) => {
    console.log(" > Connection to MongoDB failed.\n"+e)
  })
