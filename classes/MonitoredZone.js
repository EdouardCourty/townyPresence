const PlayerCoordinates = require("./PlayerCoordinates")

class MonitoredZone {

    leftX = null;
    rightX = null;
    topZ = null;
    bottomZ = null;
    name = null;

    constructor(data) {
        this.leftX = data.leftX;
        this.rightX = data.rightX;
        this.topZ = data.topZ;
        this.bottomZ = data.bottomZ;
        this.name = data.name;
    }

    /**
     * @param {PlayerCoordinates} coordData
     * @param {MonitoredZone} zone
     */
    static isPlayerInZone(coordData, zone) {
        return coordData.x > zone.leftX && coordData.x < zone.rightX && coordData.z > zone.topZ && coordData.z < zone.bottomZ;
    }
}

module.exports = MonitoredZone;
