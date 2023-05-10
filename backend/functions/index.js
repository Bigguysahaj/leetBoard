const functions = require("firebase-functions");
const fs = require("fs/promises");
const scraper = require("./scraper");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// use this when you need date for the leaderboard
// const getToday = () => {
//   const today = new Date();
//   return `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
// };

const usernames = async () => {
  const users = await fs.readFile("students.json", "utf-8");
  return JSON.parse(users);
};

exports.pubsub = functions
    .region("us-central1")
    .runWith({memory: "2GB"})
    .pubsub.schedule("0 0 * * *")
    .timeZone("America/New_York")
    .onRun(async () => {
      try {
        const users = await usernames();
        const scrapedData = await scraper.scrapeData(users);
        await db.collection("leaderboard").doc("board").set({scrapedData});
      } catch (error) {
        throw new Error(error);
      }
    });
