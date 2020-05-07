const Broadcaster = require("../classes/Broadcaster");
const EmbedSender = require("../classes/EmbedSender");

exports.run = async (client, message, args) => {
  const command = args[0];
  const zoneName = args[1];
  const zoneData = {
    name: zoneName,
    coordinates: {
      leftX: parseInt(args[2]),
      rightX: parseInt(args[3]),
      topZ: parseInt(args[4]),
      bottomZ: parseInt(args[5])
    }
  }
  const serverId = parseInt(message.guild.id);
  switch (command) {
    case "show":
      Broadcaster.getZones(serverId, message.channel);
      break;
    case "add":
      Broadcaster.addZone(serverId, message.channel, zoneData);
      break;
    case "remove":
      Broadcaster.removeZone(serverId, message.channel, zoneName);
      break;
    default:
      await EmbedSender.sendSimpleEmbed(
        message.channel,
        "An error occured.",
        "The provided argument is not bound to an action. Please retry.",
        "warning"
      )
  }
};

exports.info = {
  name: "Zone",
  description: "List all the zones registered.",
  commandExample: "!zone <show|add|remove>"
};