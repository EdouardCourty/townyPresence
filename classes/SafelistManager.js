const Safelist = require("../models/Safelist");
const NoConfigFoundException = require("./exceptions/NoConfigFoundException");
const UserAlreadyRegisteredException = require("./exceptions/UserAlreadyRegisteredException");
const UserNotRegisteredException = require("./exceptions/UserNotRegisteredException");

class SafelistManager {
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
  static async removeUserFromSafelist(serverId, username) {
    let updatedDoc = await this.getSafelist(serverId);
    if (!updatedDoc.usernames.includes(username)) {
      throw new UserNotRegisteredException()
    }
    updatedDoc.usernames.splice(updatedDoc.usernames.indexOf(username), 1);
    updatedDoc.usernames = updatedDoc.usernames.filter(uName => uName !== username);
    return Safelist.findOneAndUpdate({serverId: serverId}, updatedDoc)
  }
}

module.exports = SafelistManager;