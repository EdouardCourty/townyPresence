const eventBus = require("../lib/eventBus");

class Monitor {
    serverId = Number();
    configFolder = String();

    /**
     * @param {Number} serverId
     */
    constructor(serverId) {
        this.serverId = serverId;
        this.configFolder = `../config/${serverId}`;
    }
}