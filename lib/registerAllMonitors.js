const Monitor = require("../classes/Monitor");

module.exports = () => {
    /** @type {Array<Number>} */
    const serverList = require("../config/serverlist.json");
    return serverList.map(serverId => new Monitor(serverId))
}