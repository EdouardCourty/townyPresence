const mongoose = require("mongoose");

const whitelist = new mongoose.Schema({
  "serverId": Number,
  "servers": Array()
});

module.exports = mongoose.model("Whitelist", whitelist);