const eventBus = require("../lib/eventBus");
const EmbedSender = require("./EmbedSender");
const fs = require("fs");

class Monitor {
  serverId = Number();
  configFolder = String();
  message;

  /**
   * @param {Number} serverId
   */
  constructor(serverId) {
    this.serverId = serverId;
    this.configFolder = `./config/${serverId}/`;

    this.createConfigurationFolderIfNotExists(serverId);
    this.startListener();
    this.registerConfigurtion();
  }

  /**
   * @param {Object} message
   */
  setBaseMessage(message) {
    this.message = message;
  }

  startListener() {
    eventBus.on("dataFromAPI", (serverId, data, success) => {
      if (serverId === this.serverId) {
        const edit = success
          ? EmbedSender.getSimpleEmbed("Data received", data, "success")
          : EmbedSender.getSimpleEmbed("No data received from Dynmap", data.message, "warning")
        this.message.edit(edit).catch(() => {
          this.message.channel.send(edit).then(message => {
            this.setBaseMessage(message)
          })
        })
      }
    })
  }

  registerConfigurtion() {
    this.createFileIfNotExists("checklist.json", {
      players: []
    })
    this.createFileIfNotExists("safelist.json", {
      players: []
    })
  }

  /**
   * @param {String} fileName
   * @param {String} [content=""]
   */
  createFileIfNotExists(fileName, content = "") {
    const path = `${this.configFolder}${fileName}`;
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify(content, null, 2))
    }
  }


  /**
   * @param {Number} serverId
   */
  createConfigurationFolderIfNotExists(serverId) {
    if (!fs.existsSync(this.configFolder)) {
      fs.mkdirSync(this.configFolder);
    }
  }
}

module.exports = Monitor;