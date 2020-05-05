const mongoose = require("mongoose");

const safelist = new mongoose.Schema({
  "serverId": Number,
  "usernames": Array(),
});

module.exports = mongoose.model("Safelist", safelist);