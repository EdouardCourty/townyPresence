class Player {

    x = null;
    z = null;
    playerName = null;

    /**
     * @param {Object} data
     * @param {Number} data.x
     * @param {Number} data.z
     * @param {String} data.name
     */
    constructor(data) {
        this.x = data.x;
        this.z = data.z;
        this.playerName = data.name;
    }
}

module.exports = Player;
