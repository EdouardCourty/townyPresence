class PlayerCoordinates {

    x = null;
    z = null;
    playerName = null;

    constructor(data) {
        this.x = data.x;
        this.z = data.z;
        this.playerName = data.name;
    }
}

module.exports = PlayerCoordinates;
