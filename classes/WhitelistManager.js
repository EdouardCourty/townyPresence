const eventBus = require("../lib/eventBus");
const Whitelist = require("../models/Whitelist");
const EmbedSender = require("./EmbedSender");
const UserAlreadyRegisteredException = require("./exceptions/UserAlreadyRegisteredException");
const UserNotRegisteredException = require("./exceptions/UserNotRegisteredException");

class WhitelistManager {
  constructor() {
    this.createConfigIfNotExists();
    this.startListeners();
  }

  startListeners() {
    eventBus.on("addServerIdToWhitelist", async (serverId, channel) => {
      this.addUserToWhitelist(serverId).then(() => {
        EmbedSender.sendSimpleEmbed(
          channel,
          "Assignation complete",
          `Server ID ${serverId} has been added to the whitelist`,
          "success"
        )
      }).catch(() => {
        EmbedSender.sendSimpleEmbed(
          channel,
          "An error occured",
          `Server ID ${serverId} is already whitelisted`,
          "warning"
        )
      })
    })

    eventBus.on("removeServerIdFromWhitelist", async (serverId, channel) => {
      this.removeUserFromWhitelist(serverId).then(() => {
        EmbedSender.sendSimpleEmbed(
          channel,
          "Assignation complete",
          `Server ID ${serverId} has been removed from the whitelist`,
          "success"
        )
      }).catch(() => {
        EmbedSender.sendSimpleEmbed(
          channel,
          "An error occured",
          `Server ID ${serverId} is not whitelisted`,
          "warning"
        )
      })
    })

    eventBus.on("getWhitelistCommand", (channel) => {
      Whitelist.find().then(async doc => {
        await EmbedSender.sendSimpleEmbed(channel, "Whitelist dump", doc[0].servers.join("\n"), "success")
      })
    })
  }

  async addUserToWhitelist(serverId) {
    const updatedDoc = await Whitelist.findOne();
    if (updatedDoc.servers.includes(serverId)) {
      throw new UserAlreadyRegisteredException()
    }
    updatedDoc.servers.push(serverId);
    return Whitelist.findOneAndUpdate({}, updatedDoc)
  }

  async removeUserFromWhitelist(serverId) {
    const updatedDoc = await Whitelist.findOne();
    if (!updatedDoc.servers.includes(serverId)) {
      throw new UserNotRegisteredException()
    }
    updatedDoc.servers.splice(updatedDoc.servers.indexOf(serverId), 1);
    return Whitelist.findOneAndUpdate({}, updatedDoc)
  }

  createConfigIfNotExists() {
    Whitelist.find().then(doc => {
      if (!doc.length) {
        const baseDoc = new Whitelist({
          servers: []
        })
        baseDoc.save()
      }
    })
  }

  static addServerIdToWhitelist(serverId, channel) {
    eventBus.emit("addServerIdToWhitelist", serverId, channel)
  }

  static removeServerIdFromWhitelist(serverId, channel) {
    eventBus.emit("removeServerIdFromWhitelist", serverId, channel)
  }

  static getWhitelist(channel) {
    eventBus.emit("getWhitelistCommand", channel)
  }
}

module.exports = WhitelistManager;
