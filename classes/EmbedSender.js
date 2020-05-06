class EmbedSender {
  static COLOR_SUCCESS = 65399;
  static COLOR_INFO = 15410827;
  static COLOR_WARNING = 16771584;
  static COLOR_ERROR = 15735326;

  static getNotAuthorizedEmbed() {
    return {
      color: this.COLOR_INFO,
      title: "Your server is not whitelisted.",
      description: "You cannot use this bot for now. Contact <@486262563948986401>."
    }
  }

  /**
   * @param {String} title
   * @param {String} description
   * @param {String} level
   * @return {{embed: {color: number, description: String, title: String}}}
   */
  static getSimpleEmbed(title, description, level) {
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

    return {
      embed: {
        color: color,
        title: title,
        description: description,
        footer: {
          text: `Random number - ${(Math.random()*10).toFixed(4)}`
        }
      }
    };
  }

  /**
   * @param {Object} channel
   * @param {String} title
   * @param {String} description
   * @param {String} level
   * @return {Promise<Object>}
   */
  static sendSimpleEmbed(channel, title, description, level) {
    return channel.send(this.getSimpleEmbed(title, description, level))
  }

  /**
   * @param {Object} channel
   * @return {Promise<Object>}
   */
  static sendNoMonitorRunning(channel) {
    return this.sendSimpleEmbed(channel,
      "Unable to execute this command",
      "No monitor is actually running.",
      "error")
  }
}

module.exports = EmbedSender;