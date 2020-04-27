const eventBus = require("../lib/eventBus");

eventBus.on("psartek", () => {
  console.log("Psartek !")
});

eventBus.emit("psartek");