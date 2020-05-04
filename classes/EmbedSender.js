const getEmbed = require("../lib/getEmbed");

class EmbedSender {
  static async getEmbed(date, checkList, safeList, onlineStatus, zoneCount, proximityData) {
    return {
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
          name: `Monitoring ${zoneCount} zones`,
          value: proximityData
        }
      ]
    };
  }

  static async replaceMessage(message, content) {
    await message.edit(content);
  }

  static getNotAuthorizedEmbed() {
    return {
      color: 15410827,
      title: "Your server is not whitelisted.",
      description: "You cannot use this bot for now. Contact <@486262563948986401>."
    }
  }
}

module.exports = EmbedSender;