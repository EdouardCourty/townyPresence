const MonitoredZone = require("../classes/MonitoredZone");
const PlayerCoordinates = require("../classes/PlayerCoordinates");

module.exports = (playerArray) => {
    const players = playerArray.map(p => new PlayerCoordinates(p));
    const zones = MonitoredZone.getAllZonesFromJSON();

    let locatedPlayers = [];

    players.forEach(player => {
        zones.forEach(zone => {
            if (MonitoredZone.isPlayerInZone(player, zone)) {
                locatedPlayers.push({
                    playerName: player.playerName,
                    zoneName: zone.name
                })
            }
        })
    })

    return locatedPlayers;
}