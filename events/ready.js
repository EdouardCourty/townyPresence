module.exports = (client) => {
  console.log(` > Successfully logged in as ${client.user.tag}
  • I'm connected on ${client.guilds.size} guild, listening to ${client.users.size} users.
  • I have ${client.user.friends.size} friends and ${client.user.blocked.size} blocked users.`);
};