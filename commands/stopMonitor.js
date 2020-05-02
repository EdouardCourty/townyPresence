const eventBus = require("../lib/eventBus");

exports.run = (client, message) => {
  if (client.isMonitoring) {
    eventBus.emit("stopMonitoring");
  } else {
    message.channel.send("There is no active monitoring session.");
  }
};

exports.info = {
  name       : "stopmonitor",
  description: "Stops the monitoring.",
  commandExample: "!stopmonitor"
};