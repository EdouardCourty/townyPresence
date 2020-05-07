const mongoose = require("mongoose");

const zone = new mongoose.Schema({
  "serverId": Number,
  "zones": Array,
});

module.exports = mongoose.model("Zone", zone);