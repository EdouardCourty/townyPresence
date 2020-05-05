const mongoose = require("mongoose");
const {MONGODB_CONNECTION_STRING} = require("../config/config.json");

mongoose.connect(MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(" > Connection to MongoDB established.")
  process.exit()
}).catch((e) => {
  console.log(" > Connection to MongoDB failed.\n"+e)
  process.exit()
})