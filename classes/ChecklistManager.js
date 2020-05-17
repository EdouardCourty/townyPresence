const UserNotRegisteredException = require("./exceptions/UserNotRegisteredException");
const NoConfigFoundException = require("./exceptions/NoConfigFoundException");
const UserAlreadyRegisteredException = require("./exceptions/UserAlreadyRegisteredException");
const Checklist = require("../models/Checklist");

class ChecklistManager {
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
  static async removeUserFromChecklist(serverId, username) {
    let updatedDoc = await this.getChecklist(serverId);
    if (!updatedDoc.usernames.includes(username)) {
      throw new UserNotRegisteredException()
    }
    updatedDoc.usernames.splice(updatedDoc.usernames.indexOf(username), 1);
    return Checklist.findOneAndUpdate({serverId: serverId}, updatedDoc)
  }
}

module.exports = ChecklistManager;