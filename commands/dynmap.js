exports.run = async (client, message) => {
    const DYNMAP_URL = "https://earthmc.net/map/";
    await message.channel.send({
        embed: {
            color: 2943145,
            title: "EMC DynMap Link",
            description: DYNMAP_URL
        }
    })
}

exports.info = {
    name       : "DynMap",
    description: "Returns a link to the EMC DynMap.",
    commandExample: "!dynmap"
};