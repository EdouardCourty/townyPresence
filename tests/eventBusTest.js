const eventBus = require("../lib/eventBus");

module.exports = () => {
  eventBus.on("psartek", () => {
    console.log("Psartek !")
  });
};
