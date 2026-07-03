const axios = require("axios");

const newsTopics =
  require("../config/newsTopics");

const ExternalNews =
  require("../models/ExternalNews");

const getCategoryFromTopic =
  require("../utils/getCategoryFromTopic");

const states =
  require("../config/states");

  const cleanupRawNews =
require("../utils/cleanupRawNews");

const fetchAllNews = async () => {

  try {

    console.log(
      "News Update:",
      new Date()
    );

    for (const category in newsTopics) {

      const topics =
        newsTopics[category];

      for (const topic of topics) {

        console.log(
          "Fetching:",
          topic
        );

        const response =
          await axios.get(

            `https://newsapi.org/v2/everything?q=${topic}&language=en&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`

          );

        const articles =
          response.data.articles;

        const detectedCategory =
          getCategoryFromTopic(
            topic
          );

        for (const article of articles) {

          const exists =
            await ExternalNews.findOne({

              articleUrl:
                article.url,

            });

          if (exists)
            continue;
          if (!article.title) {
            continue;
          }
          await ExternalNews.create({

            title: article.title || "",

            description: article.description || "",

            content: article.content || "",

            imageUrl: article.urlToImage || "",

            articleUrl: article.url || "",

            source: article.source?.name || "",

            topic,

            category: detectedCategory,

            publishedAt: article.publishedAt,

            status: "raw",

            processed: false,

          });

        }

      }

    }

    for (const stateName of states) {

      const topic =

        `${stateName} electric vehicles OR EV OR electric car OR EV charging OR battery technology OR charging station OR e-mobility`;

      console.log(
        "Fetching State:",
        stateName
      );

      const response =
        await axios.get(

          `https://newsapi.org/v2/everything?q=${topic}&language=en&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`

        );

      const articles =
        response.data.articles;

      for (const article of articles) {

        const exists =
          await ExternalNews.findOne({

            articleUrl:
              article.url,

          });

        if (
          exists ||
          !article.title
        ) continue;

        await ExternalNews.create({

          title: article.title,

          description: article.description || "",

          content: article.content || "",

          imageUrl: article.urlToImage || "",

          articleUrl: article.url || "",

          source: article.source?.name || "",

          topic,

          category: "state",

          stateName: stateName.toLowerCase(),

          publishedAt: article.publishedAt,

          status: "raw",

          processed: false,

        });

      }

    }
    console.log(
      "All News Fetched Successfully"
    );
    await cleanupRawNews();

  }

  catch (error) {

    console.log(error);

  }

};

module.exports =
  fetchAllNews;