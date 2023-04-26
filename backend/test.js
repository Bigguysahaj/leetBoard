const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function start(user) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://leetcode.com/${user.username}/`);

    const scores = await page.$$eval('div[class="text-[24px] font-medium text-label-1 dark:text-dark-label-1"]', elements => elements.map(e => e.innerText));

    const names = [user.name];
    // const names = await page.$$eval('div[class="text-label-1 dark:text-dark-label-1 break-all text-base font-semibold"]', elements => elements.map(e => e.innerText));

    const data = names.map((name, index) => {
        return {
            name,
            score: scores[index]
        };
    });

    await fs.writeFile("scores.json", JSON.stringify(data), {flag: 'w'});

    await browser.close();
    // page.$$eval(a,b)  
    // await page.waitForSelector('div[class="css-1v1d5rx"]');

    // const data = await page.evaluate(() => {

    //     const score = document.querySelectorAll('div[class="text-[24px] font-medium text-label-1 dark:text-dark-label-1"]');
    //     const scoreArray = Array.from(score).map(v => v.src);
    //     return scoreArray;
    // });

    

    // console.log(data);
    // return data;
}


async function main() {
    const userJSON = await fs.readFile("../public/students.json", "utf-8");
    const usernames = JSON.parse(userJSON);

    await fs.unlink('scores.txt').catch(err => console.log(err));

    for (const user of usernames) {
        await start(user);
    }
}

main();


