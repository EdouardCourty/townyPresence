const puppeteer = require("puppeteer");

const IMAGE_PATH = "./data/exports/screenshots";

module.exports = (rOpt) => {
  const REQUEST_URL = `https://earthmc.net/map/?worldname=earth&mapname=flat&zoom=${rOpt.zoom}&x=${rOpt.x}&y=${rOpt.y}&z=${rOpt.z}`;

  return new Promise(async (resolve, reject) => {
    const path = `${IMAGE_PATH}/map-${Date.now()}.png`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(REQUEST_URL);
    await page.waitFor(6000);
    await page.screenshot({path: path});

    await browser.close();

    resolve(path)
  })
};