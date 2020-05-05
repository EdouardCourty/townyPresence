const Vibrant = require("node-vibrant");

exports.run = async (client, message, args) => {
  let playerName = args[0];
  if (!playerName) {
    return message.channel.send("Please specify a username.");
  }
  const SKIN_IMAGE_URL = `https://minotar.net/armor/body/${playerName}/200.png`;

  let vibrantColor = await Vibrant.from(SKIN_IMAGE_URL).getPalette();
  vibrantColor = vibrantColor.Vibrant;

  await message.channel.send({
    embed: {
      title: `${playerName}'s skin`,
      image: {
        url: SKIN_IMAGE_URL
      },
      color: getIntegerFromRGB(...vibrantColor._rgb)
    }
  })
};

exports.info = {
  name: "GetSKin",
  description: "Returns ths skin of a player.",
  commandExample: "!getskin PHP_Sensei"
};


function getIntegerFromRGB(r, g ,b) {
  return 256*256*r+256*g+b
}
