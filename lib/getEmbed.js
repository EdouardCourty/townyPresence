/**
 * @param date
 * @param checkList
 * @param safeList
 * @param onlineStatus
 * @param zoneCount
 * @param proximityData
 * @return {{color: number, footer: {text: string}, description: string, title: string, fields: [{inline: boolean, name: string, value: string}, {inline: boolean, name: string, value: string}, {name: string, value: *}, {name: string, value: *}]}}
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