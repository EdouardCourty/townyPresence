const Monitor = require("./Monitor");
const EmbedGenerator = require("./EmbedSender");

class DataProcessor {
  playerArray;
  serverId;
  checklist;
  safelist;

  /**
   * @param {Monitor} monitor
   * @param {Object} data
   * @param {Object} checklist
   * @param {Object} safelist
   */
  constructor(monitor, data, checklist, safelist) {
    this.playerArray = data.data.players;
    this.serverId = monitor.serverId;
    this.checklist = checklist;
    this.safelist = safelist;
  }

  async process() {

    return {
      title: "That's a title",
      description: "That's a description",
      color: EmbedGenerator.COLOR_INFO,
      fields: [
        {
          name: "checklist",
          value: ` > ${this.checklist.join("\n > ")}`
        },
        {
          name: "safelist",
          value: ` > ${this.safelist.join("\n > ")}`
        }
      ],
      footer: {
        text: `Random number - ${(Math.random()*10).toFixed(4)}`
      }
    }
  }
}

module.exports = DataProcessor;