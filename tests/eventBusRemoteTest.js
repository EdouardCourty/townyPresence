const eventBus = require("../lib/eventBus");

require("./eventBusTest")();

eventBus.emit("psartek");
