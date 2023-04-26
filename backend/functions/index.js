const functions = require("firebase-functions");
const cors = require("cors")( {origin: true} );

// const cheerio = require('cheerio');
// const getUrls = require('get-urls');
// const fetch = require('node-fetch');

const puppeteer = require("puppeteer");


const scrapeData = async (username) => {
  const browser = await puppeteer.launch({headless: true});
  // headless: true means that the browser will not be visible
  const page = await browser.newPage();
  await page.goto(`https://leetcode.com/${username}/`);

  // await page.waitForSelector('div[class="css-1v1d5rx"]');

  const data = await page.evaluate(() => {
    const score = page$.querySelectorAll(
        `div[class=\"text-[24px]
        font-medium text-label-1
        dark:text-dark-label-1\"]`,
    );
    const scoreArray = Array.from(score).map((v) => v.src);
    return scoreArray;
  });

  await browser.close();

  console.log(data);
  return data;
};


exports.scraper = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const body = JSON.parse(request.body);
    const data = await scrapeData(body.url);

    response.send(data);
  });
});
