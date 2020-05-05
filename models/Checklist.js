const mongoose = require("mongoose");

const checklist = new mongoose.Schema({
  "serverId": Number,
  "usernames": Array,
});

module.exports = mongoose.model("Checklist", checklist);