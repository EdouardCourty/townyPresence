const mongoose = require("mongoose");

const whitelist = new mongoose.Schema({
  "servers": Array
});

module.exports = mongoose.model("Whitelist", whitelist);
