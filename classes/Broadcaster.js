const Monitor = require("./Monitor");
const eventBus = require("../lib/eventBus");
const EmbedSender = require("./EmbedSender");
const axios = require("axios");
const {REQUEST_URL, REQUEST_DELAY} = require("../config/config.json")

class Broadcaster {
  /** @type {Monitor[]} */
  monitors = Array();

  constructor() {
    this.startRegisterer();
    this.startStatusListener();
    this.startStopListener();
    this.startQueryLoop();
    this.startQueryListener();
    this.startOtherListeners();
  }

  startQueryLoop() {
    setInterval(this.getDataFromDynmapAPI, REQUEST_DELAY)
  }

  getDataFromDynmapAPI() {
    axios.get(REQUEST_URL).then(data => {
      eventBus.emit("requestCompleted", data)
    }).catch(e => {
      eventBus.emit("requestFailed", e)
    })
  }

  startQueryListener() {
    eventBus.on("requestCompleted", (data) => {
      this.monitors.forEach(monitor => {
        eventBus.emit("dataFromAPI", monitor.serverId, "Got data from the API", true)
      })
    })

    eventBus.on("requestFailed", (e) => {
      this.monitors.forEach(monitor => {
        eventBus.emit("dataFromAPI", monitor.serverId, e, false)
      })
    })
  }

  startRegisterer() {
    eventBus.on("registerMonitor", async (serverId, channel) => {
      const monitorExists = this.monitors.filter(mon => mon.serverId === serverId)[0];
      if (monitorExists) {
        await EmbedSender.sendSimpleEmbed(
          channel,
          "Monitor status information",
          "Monitor is already running.",
          "warning"
        )
      } else {
        const monitor = new Monitor(serverId);
        EmbedSender.sendSimpleEmbed(
          channel,
          "Monitor status information",
          "Monitor started successfully.",
          "success"
        ).then(message => {
          monitor.setBaseMessage(message)
          this.monitors.push(monitor);
        })
      }
    });
  }

  startStatusListener() {
    eventBus.on("requestStatus", async (serverId, channel) => {
      const monitor = this.monitors.filter(monitor => monitor.serverId === serverId)[0]
      if (monitor) {
        await EmbedSender.sendSimpleEmbed(
          channel,
          "Monitor status information",
          "Monitor is up.",
          "success"
        )
      } else {
        await EmbedSender.sendSimpleEmbed(
          channel,
          "Monitor status information",
          "Monitor is down.",
          "error"
        )
      }
    });
  }

  startStopListener() {
    eventBus.on("stopMonitor", async (serverId, channel) => {
      const monitor = this.monitors.filter(monitor => monitor.serverId === serverId)[0];
      if (monitor) {
        await monitor.message.delete();
        this.monitors.splice(this.monitors.indexOf(monitor), 1)
        await EmbedSender.sendSimpleEmbed(
          channel,
          "Monitor status information",
          "The monitor has stopped working successfully.",
          "success"
        )
      } else {
        await EmbedSender.sendNoMonitorRunning(channel)
      }
    })
  }

  startOtherListeners() {
    eventBus.on("bringDownMonitorEmbed", async (serverId, channel) => {
      const monitor = this.monitors.filter(monitor => monitor.serverId === serverId)[0];
      if (monitor) {
        monitor.message.delete().catch()
      } else {
        await EmbedSender.sendNoMonitorRunning(channel)
      }
    })
  }

  /**
   * @param {Number} serverId
   * @param {Object} channel
   */
  static getStatus(serverId, channel) {
    eventBus.emit("requestStatus", serverId, channel);
  }

  /**
   * @param {Number} serverId
   * @param {Object} channel
   */
  static stopMonitor(serverId, channel) {
    eventBus.emit("stopMonitor", serverId, channel);
  }

  /**
   * @param {Number} serverId
   * @param {Object} channel
   */
  static registerMonitor(serverId, channel) {
    eventBus.emit("registerMonitor", serverId, channel)
  }

  /**
   * @param {Number} serverId
   * @param {Object} channel
   */
  static getMonitor(serverId, channel) {
    eventBus.emit("bringDownMonitorEmbed", serverId, channel)
  }
}

module.exports = Broadcaster;