const Zone = require("../models/Zone");
const NoConfigFoundException = require("./exceptions/NoConfigFoundException");
const ZoneAlreadyExistsException = require("./exceptions/ZoneAlreadyExistsException")
const ZoneNotRegisteredException = require("./exceptions/ZoneNotRegisteredException")

class ZoneManager {
  static async getDocument(serverId) {
    let doc = Zone.findOne({serverId: serverId});
    if (doc) {
      return doc;
    } else {
      throw new NoConfigFoundException()
    }
  }

  static async addZone(serverId, zoneData) {
    const updatedDoc = await Zone.findOne({serverId: serverId});
    if (updatedDoc.zones.includes(serverId)) {
      throw new ZoneAlreadyExistsException()
    }
    updatedDoc.zones.push(zoneData);
    return Zone.findOneAndUpdate({serverId: serverId}, updatedDoc)
  }

  static async removeZone(serverId, zoneName) {
    let updatedDoc = await this.getDocument(serverId);
    updatedDoc.zones = updatedDoc.zones.filter(zone => zone.name !== zoneName);
    return Zone.findOneAndUpdate({serverId: serverId}, updatedDoc);
  }

  // TODO: IMLEMENT THE SAME SYSTEM ND ASS MANAGERS FOR SAFE AND CHECK LIST
}

module.exports = ZoneManager;