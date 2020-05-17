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
    let updatedDoc = await this.getDocument(serverId);
    if (updatedDoc.zones.map(z => z.name).includes(zoneData.name)) {
      throw new ZoneAlreadyExistsException()
    }
    updatedDoc.zones.push(zoneData);
    return Zone.findOneAndUpdate({serverId: serverId}, updatedDoc)
  }

  static async removeZone(serverId, zoneName) {
    let updatedDoc = await this.getDocument(serverId);
    if (!updatedDoc.zones.map(z => z.name).includes(zoneName)) {
      throw new ZoneNotRegisteredException()
    }
    updatedDoc.zones = updatedDoc.zones.filter(zone => zone.name !== zoneName);
    return Zone.findOneAndUpdate({serverId: serverId}, updatedDoc);
  }
}

module.exports = ZoneManager;