class PlayerCoordinates {

    x = null;
    z = null;
    playerName = null;

    constructor(data) {
        this.x = data.x;
        this.y = data.y;
        this.playerName = data.name;
    }
}

module.exports = PlayerCoordinates;
