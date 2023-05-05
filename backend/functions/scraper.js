const puppeteer = require('puppeteer');
const functions = require("firebase-functions");
const fs = require("fs/promises");
const cors = require("cors")({origin: true});

const scrapeData = async (users) => {
    const browser = await puppeteer.launch({
      headless: true
    });
    const result = [];

    for (const user of users) {
      const page = await browser.newPage();
      await page.goto(`https://leetcode.com/${user.username}/`);

      const scores = await page.$$eval(
          "div[class=\"text-[24px] font-medium text-label-1 dark:text-dark-label-1\"]", // eslint-disable-line max-len
          (elements) => elements.map((e) => e.innerText),
      );

      await page.close();

      result.push({name: user.name, score: scores[0]});
    }

    await browser.close();

    return result;
};

const usernames = async () => {
  const users = await fs.readFile("students.json", "utf-8");
  return JSON.parse(users);
};

usernames().then((users) => {
  scrapeData(users).then((res) => {
    console.log(res);
  });
});

exports.scraper = scrapeData;
