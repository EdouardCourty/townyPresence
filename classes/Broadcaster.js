const Monitor = require("./Monitor");
const SafelistManager = require("./SafelistManager");
const ChecklistManager = require("./ChecklistManager");
const ZoneManager = require("./ZoneManager");
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
    this.startListsListeners();
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
        eventBus.emit("dataFromAPI", monitor.serverId, data, true)
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
        monitor.setBaseMessage(await channel.send("Awaiting for data to recreate the embed..."));
      } else {
        await EmbedSender.sendNoMonitorRunning(channel)
      }
    })
  }

  startListsListeners() {
    eventBus.on("getSafelist", async (serverId, channel) => {
      SafelistManager.getSafelist(serverId).then(list => {
          EmbedSender.sendSimpleEmbed(channel, "Safelist dump", list.usernames.join("\n"), "success")
        }).catch(() => {
        EmbedSender.sendSimpleEmbed(
          channel,
          "Checklist dump",
          "No configuration found, start the monitor once to create it automatically",
          "warning"
        )
      })
    })

    eventBus.on("getChecklist", async (serverId, channel) => {
      ChecklistManager.getChecklist(serverId).then(list => {
        EmbedSender.sendSimpleEmbed(channel, "Checklist dump", list.usernames.join("\n"), "success")
      }).catch(() => {
        EmbedSender.sendSimpleEmbed(
          channel,
          "Checklist dump",
          "No configuration found, start the monitor once to create it automatically",
          "warning"
        )
      })
    })

    eventBus.on("addUserToSafelist", async (serverId, channel, username) => {
      SafelistManager.addUserToSafelist(serverId, username).then(() => {
        EmbedSender.sendSimpleEmbed(
          channel,
          "Assignation complete.",
          `Username ${username} added to the safelist`,
          "success"
        )
      }).catch(e => {
        if (e.e === "noConfig") {
          EmbedSender.sendSimpleEmbed(
            channel,
            "Bad configuration",
            "No configuration found, start the monitor once to create it automatically",
            "warning"
          )
        } else {
          EmbedSender.sendSimpleEmbed(
            channel,
            "An error occured.",
            `Username ${username} is already safelisted`,
            "warning"
          )
        }
      })
    })

    eventBus.on("addUserToChecklist", async (serverId, channel, username) => {
      ChecklistManager.addUserToChecklist(serverId, username).then(() => {
        EmbedSender.sendSimpleEmbed(
          channel,
          "Assignation complete.",
          `Username ${username} added to the checklist`,
          "success"
        )
      }).catch(e => {
        if (e.e === "noConfig") {
          EmbedSender.sendSimpleEmbed(
            channel,
            "Bad configuration",
            "No configuration found, start the monitor once to create it automatically",
            "warning"
          )
        } else {
          EmbedSender.sendSimpleEmbed(
            channel,
            "An error occured.",
            `Username ${username} is already checklisted`,
            "warning"
          )
        }
      })
    })

    eventBus.on("removeUserFromSafelist", async (serverId, channel, username) => {
      SafelistManager.removeUserFromSafelist(serverId, username).then(() => {
        EmbedSender.sendSimpleEmbed(
          channel,
          "Remove complete.",
          `Username ${username} removed from the safelist`,
          "success"
        )
      }).catch(e => {
        if (e.e === "noConfig") {
          EmbedSender.sendSimpleEmbed(
            channel,
            "Bad configuration",
            "No configuration found, start the monitor once to create it automatically",
            "warning"
          )
        } else {
          EmbedSender.sendSimpleEmbed(
            channel,
            "An error occured.",
            `Username ${username} is not safelisted`,
            "warning"
          )
        }
      })
    })

    eventBus.on("removeUserFromChecklist", async (serverId, channel, username) => {
      ChecklistManager.removeUserFromChecklist(serverId, username).then(() => {
        EmbedSender.sendSimpleEmbed(
          channel,
          "Remove complete.",
          `Username ${username} removed from the checklist`,
          "success"
        )
      }).catch(e => {
        if (e.e === "noConfig") {
          EmbedSender.sendSimpleEmbed(
            channel,
            "An error occured.",
            `Username ${username} is already checklisted`,
            "warning"
          )
        } else {
          EmbedSender.sendSimpleEmbed(
            channel,
            "An error occured.",
            `Username ${username} is not checklisted`,
            "warning"
          )
        }
      })
    })

    eventBus.on("getZones", async (serverId, channel) => {
      ZoneManager.getDocument(serverId).then(list => {
        EmbedSender.sendSimpleEmbed(channel, "Zonelist dump", list.zones.map(z => z.name).join("\n"), "success")
      }).catch(() => {
        EmbedSender.sendSimpleEmbed(
          channel,
          "Zonelist dump failed",
          "No configuration found, start the monitor once to create it automatically",
          "warning"
        )
      })
    })

    eventBus.on("addZone", async (serverId, channel, zoneData) => {
      ZoneManager.addZone(serverId, zoneData).then(() => {
        EmbedSender.sendSimpleEmbed(
          channel,
          "Zone successfully created",
          `Zone ${zoneData.name} added to the zonelist`,
          "success")
      }).catch(e => {
        if (e.e === "noConfig") {
          EmbedSender.sendSimpleEmbed(
            channel,
            "Bad configuration",
            "No configuration found, start the monitor once to create it automatically",
            "warning"
          )
        } else {
          EmbedSender.sendSimpleEmbed(
            channel,
            "Zone add failed.",
            "A zone with this name already exists",
            "warning"
          )
        }
      })
    })

    eventBus.on("removeZone", async (serverId, channel, zoneName) => {
      ZoneManager.removeZone(serverId, zoneName).then(() => {
        EmbedSender.sendSimpleEmbed(
          channel,
          "Remove complete.",
          `Zone ${zoneName} removed from the zonelist`,
          "success"
        )
      }).catch(e => {
        if (e.e === "noConfig") {
          EmbedSender.sendSimpleEmbed(
            channel,
            "Bad configuration",
            "No configuration found, start the monitor once to create it automatically",
            "warning"
          )
        } else {
          EmbedSender.sendSimpleEmbed(
            channel,
            "An error occured.",
            `Zone ${zoneName} is not in the zone list`,
            "warning"
          )
        }
      })
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

  /**
   * @param {Number} serverId
   * @param {Object} channel
   */
  static getChecklist(serverId, channel) {
    eventBus.emit("getChecklist", serverId, channel)
  }

  /**
   * @param {Number} serverId
   * @param {Object} channel
   */
  static getSafelist(serverId, channel) {
    eventBus.emit("getSafelist", serverId, channel)
  }

  /**
   * @param {Number} serverId
   * @param {Object} channel
   * @param {String} username
   */
  static addUserToSafelist(serverId, channel, username) {
    eventBus.emit("addUserToSafelist", serverId, channel, username)
  }

  /**
   * @param {Number} serverId
   * @param {Object} channel
   * @param {String} username
   */
  static addUserToChecklist(serverId, channel, username) {
    eventBus.emit("addUserToChecklist", serverId, channel, username)
  }

  /**
   * @param {Number} serverId
   * @param {Object} channel
   * @param {String} username
   */
  static removeUserFromSafelist(serverId, channel, username) {
    eventBus.emit("removeUserFromSafelist", serverId, channel, username)
  }

  /**
   * @param {Number} serverId
   * @param {Object} channel
   * @param {String} username
   */
  static removeUserFromChecklist(serverId, channel, username) {
    eventBus.emit("removeUserFromChecklist", serverId, channel, username)
  }

  /**
   * @param {Number} serverId
   * @param {Object} channel
   */
  static getZones(serverId, channel) {
    eventBus.emit("getZones", serverId, channel)
  }

  /**
   * @param {Number} serverId
   * @param {Object} channel
   * @param {Object} zoneData
   */
  static addZone(serverId, channel, zoneData) {
    eventBus.emit("addZone", serverId, channel, zoneData)
  }

  /**
   * @param {Number} serverId
   * @param {Object} channel
   * @param {Object} zoneName
   */
  static removeZone(serverId, channel, zoneName) {
    eventBus.emit("removeZone", serverId, channel, zoneName)
  }
}

module.exports = Broadcaster;