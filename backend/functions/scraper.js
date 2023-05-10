const puppeteer = require("puppeteer");

const scrapeData = async (users) => {
  const browser = await puppeteer.launch({
    headless: true,
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
    if (scores[0] === undefined) {
      result.push({name: user.name, score: 0});
      continue;
    }

    result.push({name: user.name, score: parseInt(scores[0])});
  }

  await browser.close();

  return result;
};

exports.scrapeData = scrapeData;
