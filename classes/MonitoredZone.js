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
     * @param {PlayerCoordinates} playerCoordinates
     * @param {MonitoredZone} zone
     * @return {string|boolean} zoneName
     */
    static isPlayerInZone(playerCoordinates, zone) {
        return playerCoordinates.x > zone.leftX
        && playerCoordinates.x < zone.rightX
        && playerCoordinates.z > zone.topZ
        && playerCoordinates.z < zone.bottomZ
            ? zone.name
            : false;
    }

    /**
     * @param {String} [path="../config/zones"]
     * @return {MonitoredZone[]}
     */
    static getAllZonesFromJSON(path = "../config/zones") {
        /** @type {Array} */
        const data = require(path);
        return data.map(z => new MonitoredZone(z))
    }
}

module.exports = MonitoredZone;
