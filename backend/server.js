const express = require('express');
const app = express();
const { scrapeData } = require('./scraper');

app.get('/leaderboard', async (req, res) => {
    const studs = require('../public/students.json');
    const leaderboard = [];
  
    for (let i = 0; i < studs.length; i++) {
      const score = await scrapeData(studs[i].username);
      leaderboard.push({ name: studs[i].name, score: score });
    }
  
    // return the leaderboard as JSON response
    res.json(leaderboard);
  });

app.listen(8080, () => {
console.log('Server running on port 8080');
});