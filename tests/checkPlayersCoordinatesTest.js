const check = require("../lib/checkPlayersCoordinates");

const playersArrayMock = [
    {
        x: -9960,
        z: -1100,
        name: "TestNewCayennePlayer"
    },
    {
        x: -9817,
        z: -980,
        name: "TestCayennePlayer"
    },
    {
        x: -100,
        z: -600,
        name: "TestOut"
    }
];

console.log(check(playersArrayMock))