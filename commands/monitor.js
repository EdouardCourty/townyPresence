const fs = require("fs");
const eventBus = require("../lib/eventBus");
const checkProximityHandler = require("../handlers/checkProximityHandler");
const checkOnlineStatusHandler = require("../handlers/checkOnlineStatusHandler");
const getPlayerList = require("../lib/getPlayerList");
const MonitoredZone = require("../classes/MonitoredZone");
const EmbedSender = require("../classes/EmbedSender");

exports.run = (client, message) => {
  let isFirstLaunch = true;
  const REQUEST_URL = require("../config/config").REQUEST_URL;

  message.channel.send("Started the monitoring, awaiting data from the DynMap...")
    .then(msg => {
      client.isMonitoring = true;
      eventBus.on("firstLaunch", () => {
        isFirstLaunch = false;
        msg.delete()
      })
    });

  let interval = setInterval(() => {
    requestPlayers(Date.now(), REQUEST_URL, message, isFirstLaunch);
  }, 10000);

  eventBus.on("stopMonitoring", async () => {
    client.isMonitoring = false;
    clearInterval(interval);
    await message.channel.send("Stopped the monitoring.")
  });
};

exports.info = {
  name       : "Monitor",
  description: "Monitors players in the configured zone.",
  commandExample: "!monitor"
};

/**
 * @param {Number} timestamp
 * @param {String} url
 * @param {Object} message
 * @param {Boolean} isFirst
 */
function requestPlayers(timestamp, url, message, isFirst) {
  let date = new Date(timestamp - 7200);

  if (isFirst) {
    sendMessage(timestamp, url, message, date, false);
    eventBus.emit("firstLaunch")
  } else {
    const messageId = fs.readFileSync("./data/embedMessageID.json").toString();
    message.channel.fetchMessages({ limit: 1, around: messageId }).then(async messages => {
      let lastMessage = messages.first();

      if (lastMessage.author.bot) {
        sendMessage(timestamp, url, lastMessage, date, true)
      }
    }).catch(async e => {
      await message.channel.send(getErrorEmbed(date, e));
    })
  }
}

/**
 * @param {Number} timestamp
 * @param {String} url
 * @param {Object} message
 * @param {Date} date
 * @param {Boolean} edit
 */
function sendMessage(timestamp, url, message, date, edit) {
  getPlayerList().then(async data => {
    const proximityData = checkProximityHandler(timestamp, data);
    const onlineStatus = checkOnlineStatusHandler(timestamp, data);
    /** @type Array<String> */
    const checkList = require("../config/checklist");
    /** @type Array<String> */
    const safeList = require("../config/safelist").players;
    const zoneCount = MonitoredZone.getAllZonesFromJSON().length;
    const messageContent = {
        embed: EmbedSender.getEmbed(date, checkList, safeList, onlineStatus, zoneCount, proximityData)
    };
    if (edit === false) {
      await message.channel.send(messageContent).then(message => {
        fs.writeFileSync("./data/embedMessageID.json", message.id);
      })
    } else {
      await message.edit(messageContent);
    }
  }).catch(() => {
    getPlayerList()
  })
}

function getErrorEmbed(date, e) {
  return {
    embed: {
      tile: "EarthMC Monitor",
      color: 12522776,
      footer: {
        "text": `Last update: ${date}`
      },
      fields: [
        {
          name: "An error occured.",
          value: e.message
        }
      ]
    }
  }
}
