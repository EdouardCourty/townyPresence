/**
 * @param {Date} date
 * @param {Array<String>} checkList
 * @param {Array<String>} safeList
 * @param {String} onlineStatus
 * @param {Number} zoneCount
 * @param {String} proximityData
 * @return {Object} embedData
 */
module.exports = (date, checkList, safeList, onlineStatus, zoneCount, proximityData) => {
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