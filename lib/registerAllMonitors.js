const Monitor = require("../classes/Monitor");

module.exports = () => {
    /** @type {Array<Number>} */
    const whitelist = require("../config/whitelist.json");
    return whitelist.map(serverId => new Monitor(serverId))
}