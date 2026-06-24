const cron = require("node-cron");

const ExternalNews =
  require("../models/ExternalNews");

const generateDraft =
  require("../services/generateDraft");

const delay = (ms) =>
  new Promise(resolve =>
    setTimeout(resolve, ms)
  );

async function generateCategoryDrafts(
  category,
  limit = 3
) {

  try {

    const newsList =
      await ExternalNews.find({

        category,

        status: "raw",

        processed: false

      })

      .sort({
        views: -1,
        publishedAt: -1
      })

      .limit(limit);

    for (const news of newsList) {

      await generateDraft(news);

      console.log(
        `${category.toUpperCase()} Draft Generated: ${news.title}`
      );

      await delay(5000);

    }

  }

  catch (error) {

    console.log(error);

  }

}

async function generateStateDrafts() {

  try {

    const stateCounts =
      await ExternalNews.aggregate([

        {
          $match: {
            category: "state",
            status: "published"
          }
        },

        {
          $group: {
            _id: "$stateName",
            count: {
              $sum: 1
            }
          }
        }

      ]);

    const stateCountMap = {};

    stateCounts.forEach(state => {

      stateCountMap[state._id] =
        state.count;

    });

    const stateNews =
      await ExternalNews.find({

        category: "state",

        status: "raw",

        processed: false

      });

    stateNews.sort((a, b) => {

      const countA =
        stateCountMap[
          a.stateName
        ] || 0;

      const countB =
        stateCountMap[
          b.stateName
        ] || 0;

      return countA - countB;

    });

    const usedStates =
      new Set();

    let generatedCount = 0;

    for (const news of stateNews) {

      if (
        usedStates.has(
          news.stateName
        )
      ) continue;

      await generateDraft(news);

      console.log(
        `STATE Draft Generated: ${news.stateName}`
      );

      usedStates.add(
        news.stateName
      );

      generatedCount++;

      await delay(5000);

      if (
        generatedCount === 3
      ) break;

    }

  }

  catch (error) {

    console.log(error);

  }

}

/* EV Drafts - 9 AM */

cron.schedule(
  "0 9 * * *",
  async () => {

    console.log(
      "Generating EV Drafts"
    );

    await generateCategoryDrafts(
      "ev",
      3
    );

  }
);

/* BMS Drafts - 12 PM */

cron.schedule(
  "0 12 * * *",
  async () => {

    console.log(
      "Generating BMS Drafts"
    );

    await generateCategoryDrafts(
      "bms",
      3
    );

  }
);

/* International Drafts - 3 PM */

cron.schedule(
  "0 15 * * *",
  async () => {

    console.log(
      "Generating International Drafts"
    );

    await generateCategoryDrafts(
      "international",
      3
    );

  }
);

/* State Drafts - 6 PM */

cron.schedule(
  "0 18 * * *",
  async () => {

    console.log(
      "Generating State Drafts"
    );

    await generateStateDrafts();

  }
);

console.log(
  "Draft Scheduler Started"
);

module.exports = {};