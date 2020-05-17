const eventBus = require("../lib/eventBus");
const EmbedSender = require("./EmbedSender");
const DataProcessor = require("./DataProcessor");
const Checklist = require("../models/Checklist");
const Safelist = require("../models/Safelist");
const Zone = require("../models/Zone");
const UserAlreadyRegisteredException = require("./exceptions/UserAlreadyRegisteredException");
const UserNotRegisteredException = require("./exceptions/UserNotRegisteredException");

const NoConfigFoundException = require("./exceptions/NoConfigFoundException");

class Monitor {
  serverId;
  message;

  /**
   * @param {Number} serverId
   */
  constructor(serverId) {
    this.serverId = serverId;

    this.startListener();
    this.createConfigIfNotExists();
  }

  /**
   * @param {Object} message
   */
  setBaseMessage(message) {
    this.message = message;
  }

  startListener() {
    eventBus.on("dataFromAPI", async (serverId, data, success) => {
      if (serverId === this.serverId) {
        let edit;
        if (success) {
          const checklist = await Checklist.findOne({serverId: this.serverId});
          const safelist = await Safelist.findOne({serverId: this.serverId});
          const processor = new DataProcessor(this, data, checklist.usernames, safelist.usernames);
          edit = {embed: await processor.process()};
        } else {
          edit = EmbedSender.getSimpleEmbed("No data received from Dynmap", data.message, "warning")
        }
        this.handleEditOrRecreate(edit);
      }
    })
  }

  /**
   * @param {{embed:{Object}}} edit
   */
  handleEditOrRecreate(edit) {
    this.message.edit(edit).catch(() => {
      this.message.channel.send(edit).then(message => {
        this.setBaseMessage(message)
      })
    })
  }

  createConfigIfNotExists() {
    Checklist.findOne({serverId: this.serverId}).then(doc => {
      if (!doc) {
        const baseDoc = new Checklist({
          serverId: this.serverId,
          usernames: []
        })
        baseDoc.save()
      }
    })
    Safelist.findOne({serverId: this.serverId}).then(doc => {
      if (!doc) {
        const baseDoc = new Safelist({
          serverId: this.serverId,
          usernames: []
        })
        baseDoc.save()
      }
    })
    Zone.findOne({serverId: this.serverId}).then(doc => {
      if (!doc) {
        const baseDoc = new Zone({
          serverId: this.serverId,
          zones: []
        })
        baseDoc.save()
      }
    })
  }
}

module.exports = Monitor;
