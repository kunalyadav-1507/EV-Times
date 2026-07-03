const ExternalNews =
require("../models/ExternalNews");

const MAX_RAW_NEWS = 500;

const cleanupRawNews = async () => {

  try {

    const rawNews =
      await ExternalNews.find({
        status: "raw"
      })
      .sort({
        createdAt: -1
      });

    if (rawNews.length <= MAX_RAW_NEWS) {

      console.log(
        `Raw News Count: ${rawNews.length}. No cleanup required.`
      );

      return;

    }

    const newsToDelete =
      rawNews.slice(MAX_RAW_NEWS);

    await ExternalNews.deleteMany({

      _id: {
        $in: newsToDelete.map(
          news => news._id
        )
      }

    });

    console.log(`
----------------------------------
Raw News Cleanup Completed
Before Cleanup : ${rawNews.length}
Deleted        : ${newsToDelete.length}
Remaining      : ${MAX_RAW_NEWS}
----------------------------------
`);

  }

  catch (error) {

    console.log(
      "Cleanup Error:",
      error
    );

  }

};

module.exports = cleanupRawNews;