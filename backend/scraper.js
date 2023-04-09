
const axios = require('axios');
const cheerio = require('cheerio');

const scrapeData = async (username) => {
  try {
    const response = await axios.get(`https://leetcode.com/${username}/`);
    const $ = cheerio.load(response.data);
    const score = $('').text();
    return score;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  scrapeData,
};

