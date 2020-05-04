const getEmbed = require("../lib/getEmbed");

class EmbedSender {
  static COLOR_SUCCESS = null;
  static COLOR_INFO = 15410827;
  static COLOR_WARNING = null;
  static COLOR_ERROR = null;

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
      color: this.COLOR_INFO,
      title: "Your server is not whitelisted.",
      description: "You cannot use this bot for now. Contact <@486262563948986401>."
    }
  }

  /**
   * @param {Object} channel
   * @param {String} title
   * @param {String} description
   * @param {String} level
   * @return {Promise<void>}
   */
  static async sendSimpleEmbed(channel, title, description, level) {
    let color;
    switch (level) {
      case "success":
        color = this.COLOR_SUCCESS;
        break;
      case "info":
        color = this.COLOR_INFO;
        break;
      case "error":
        color = this.COLOR_ERROR;
        break;
      case "warning":
        color = this.COLOR_WARNING;
        break;
    }

    await channel.send({
      embed: {
        color: color,
        title: title,
        description: description
      }
    })
  }
}

module.exports = EmbedSender;