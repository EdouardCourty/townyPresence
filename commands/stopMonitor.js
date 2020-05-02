const eventBus = require("../lib/eventBus");

exports.run = () => {
  eventBus.emit("stopMonitoring");
};

exports.info = {
  name       : "stopmonitor",
  description: "Stops the monitoring.",
  commandExample: "!stopmonitor"
};