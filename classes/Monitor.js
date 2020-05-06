const eventBus = require("../lib/eventBus");
const EmbedSender = require("./EmbedSender");
const DataProcessor = require("./DataProcessor");
const Checklist = require("../models/Checklist");
const Safelist = require("../models/Safelist");
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
  }

  /**
   * @param {Number} serverId
   * @return {Promise<Object>}
   */
  static async getChecklist(serverId) {
    let doc = Checklist.findOne({serverId: serverId});
    if (doc) {
      return doc;
    } else {
      throw new NoConfigFoundException()
    }
  }

  /**
   * @param {Number} serverId
   * @return {Promise<Object>}
   */
  static async getSafelist(serverId) {
    let doc = Safelist.findOne({serverId: serverId});
    if (doc) {
      return doc;
    } else {
      throw new NoConfigFoundException()
    }
  }

  /**
   * @param {Number} serverId
   * @param {String} username
   * @return {Promise<Object>}
   */
  static async addUserToSafelist(serverId, username) {
    let updatedDoc = await this.getSafelist(serverId);
    if (updatedDoc.usernames.includes(username)) {
      throw new UserAlreadyRegisteredException()
    }
    updatedDoc.usernames.push(username);
    return Safelist.findOneAndUpdate({serverId: serverId}, updatedDoc)
  }

  /**
   * @param {Number} serverId
   * @param {String} username
   * @return {Promise<Object>}
   */
  static async addUserToChecklist(serverId, username) {
    let updatedDoc = await this.getChecklist(serverId);
    if (updatedDoc.usernames.includes(username)) {
      throw new UserAlreadyRegisteredException()
    }
    updatedDoc.usernames.push(username);
    return Checklist.findOneAndUpdate({serverId: serverId}, updatedDoc)
  }

  /**
   * @param {Number} serverId
   * @param {String} username
   * @return {Promise<Object>}
   */
  static async removeUserFromSafelist(serverId, username) {
    let updatedDoc = await this.getSafelist(serverId);
    if (!updatedDoc.usernames.includes(username)) {
      throw new UserNotRegisteredException()
    }
    updatedDoc.usernames.splice(updatedDoc.usernames.indexOf(username), 1);
    return Safelist.findOneAndUpdate({serverId: serverId}, updatedDoc)
  }

  /**
   * @param {Number} serverId
   * @param {String} username
   * @return {Promise<Object>}
   */
  static async removeUserFromChecklist(serverId, username) {
    let updatedDoc = await this.getChecklist(serverId);
    if (!updatedDoc.usernames.includes(username)) {
      throw new UserNotRegisteredException()
    }
    updatedDoc.usernames.splice(updatedDoc.usernames.indexOf(username), 1);
    return Checklist.findOneAndUpdate({serverId: serverId}, updatedDoc)
  }
}

module.exports = Monitor;
