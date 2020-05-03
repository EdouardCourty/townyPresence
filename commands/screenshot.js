const takeScreenshot = require("../handlers/screenshotHandler");
const options = require("../config/screenshotCoords");

exports.run = (client, message) => {
  message.channel.send(`Capturing screenshot for area around ${options.x} / ${options.y} / ${options.z}, zoomed ${options.zoom}x...`).then(message => {
    takeScreenshot(options).then(path => {
      message.channel.send({files: [path]}).then(async () => {
        await message.delete()
      })
    })
  });
};

exports.info = {
  name       : "Screenshot",
  description: "Sends a screenshot of New_Cayenne as it is displayed on the DynMap.",
  commandExample: "!screenshot"
};