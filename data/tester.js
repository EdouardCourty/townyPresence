const { Client } = require("discord.js");
require("colors");
require("dotenv").config();

const testClient = new Client();

testClient.login(process.env.APPLICATION_TOKEN)
  .then(async () => {
    console.log(`Successfully connetced to Discord. UserTag is ${testClient.user.tag}`.green);
    await testClient.destroy()
  })
  .catch(async e => {
    console.error(`Unable to connect to the Discord API.\n${e}`.red);
    await testClient.destroy()
  });