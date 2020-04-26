exports.run = (client, message, args) => {
  client.emit("stopMonitoring");
};

exports.info = {
  name       : "stopMonitor",
  description: "Stops the monitoring."
};