const functions = require("firebase-functions");

const scraper = require("./functions/scraper");
const admin = require("firebase-admin");

admin.initializeApp();

exports.pubsub = functions
    .pubsub.schedule("0 0 * * *")
    .timezone("Asia/Kolkata")
    .onRun(async () => {
      try {
        await scraper.scrapeData();
      } catch (error) {
        throw new Error(error);
      }
    })