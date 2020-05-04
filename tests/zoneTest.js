const PlayerCoordinates = require("../classes/PlayerCoordinates");
const MonitoredZone = require("../classes/MonitoredZone");

const testCoords = new PlayerCoordinates({
    x: -9960,
    z: -1100,
    name: "TestUserName"
});

const testMonitoredZone = new MonitoredZone({
    "name": "New_Cayenne",
    "leftX": -10032,
    "rightX": -9890,
    "topZ": -1183,
    "bottomZ": -1025
});

console.log(MonitoredZone.isPlayerInZone(testCoords, testMonitoredZone));
