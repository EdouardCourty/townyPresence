const Discord = require("discord.js");
const utils   = require("./lib/utils.js");
const Broadcaster = require("./classes/Broadcaster");
const mongoose = require("mongoose");
const {MONGODB_CONNECTION_STRING} = require("./config/config.json");

require("dotenv").config();

let client = new Discord.Client();

utils.login(client);
utils.loadCommands(client);
utils.loadEvents(client);

mongoose.connect(MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
    console.log(" > Connection to MongoDB established.")
  }).catch((e) => {
    console.log(" > Connection to MongoDB failed.\n"+e)
  })

const broadcaster = new Broadcaster();