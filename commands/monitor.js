const axios = require("axios");
const fs = require("fs");
const checkProximityHandler = require("../handlers/checkProximityHandler");
const checkOnlineStatusHandler = require("../handlers/checkOnlineStatusHandler");

exports.run = (client, message) => {
  const REQUEST_URL = "https://earthmc.net/map/up/world/earth/";
  let isFirst = true;
  requestPlayers(Date.now(), REQUEST_URL, message, isFirst);
  isFirst = false;
  let interval = setInterval(() => {
    requestPlayers(Date.now(), REQUEST_URL, message, isFirst);
  }, 10000);

  client.on("stopMonitoring", async () => {
    clearInterval(interval);
    await message.channel.send("Stopped the monitoring.")
  })
};

exports.info = {
  name       : "monitor",
  description: "Monitors players in the claimed zone."
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
    sendMessage(timestamp, url, message, date, false)
  } else {
    const messageId = fs.readFileSync("./data/embedMessageID.json").toString();
    const filterById = message =>  message.id === messageId;
    message.channel.awaitMessages(filterById).then(async messages => {
      let lastMessage = messages.first();

      if (lastMessage.author.bot) {
        sendMessage(timestamp, url, lastMessage, date, true)
      }
    });
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
  axios.get(url)
    .then(async data => {
      const proximity = checkProximityHandler(timestamp, data);
      const onlineStatus = checkOnlineStatusHandler(timestamp, data);
      /** @type Array */
      const checkList = require("../checklist");
      /** @type Array */
      const safeList = require("../safelist");
      const messageContent = {
        embed: {
          title: "EarthMC Monitor",
          description: "Ultimate EarthMC tracking system",
          footer: {
            "text": `Last update: ${date}\nRandom number: ${(Math.random()*10).toFixed(4)}`
          },
          color: 9617173,
          fields: [
            {
              name: "checklist.json",
              value: ` > ${checkList.join("\n > ")}`,
              inline: true
            },
            {
              name: "safelist.json",
              value: ` > ${safeList.join("\n > ")}`,
              inline: true
            },
            {
              name: "Checking online status from the checklist.json",
              value: onlineStatus
            }, {
              name: "Monitoring New_Cayenne claims",
              value: proximity,
              inline: true
            }
          ]
        }
      };
      if (edit === false) {
        await message.channel.send(messageContent).then(message => {
          fs.writeFileSync("./data/embedMessageID.json", message.id);
        })
      } else {
        await message.edit(messageContent)
      }
    })
    .catch(async e => {
      await message.channel.send({
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
      });
    })
}