const axios = require("axios");
const ExternalNews =
  require("../models/ExternalNews");

const getCategoryFromTopic =
  require("../utils/getCategoryFromTopic");

// REMOVE HTML TAGS
const removeHtml = (text = "") => {
  return text.replace(/<[^>]*>/g, "");
};

// REMOVE [+123 chars]
const removeExtraChars = (text = "") => {
  return text.replace(/\[\+\d+\schars\]/g, "");
};


// FETCH NEWS BY TOPIC
const getNewsByTopic = async (req, res) => {

  try {

    const topic = req.params.topic;
    const states =
      require("../config/states");

    let stateName = "";

    for (const state of states) {

      if (
        topic.toLowerCase()
          .includes(state)
      ) {

        stateName = state;
        break;

      }

    }

    // CHECK DATABASE FIRST
    const storedNews =
      await ExternalNews.find({
        topic: topic
      })
        .sort({ publishedAt: -1 });



    if (storedNews.length > 0) {
      console.log(topic)

      return res.status(200).json({
        success: true,
        source: "database",
        totalResults: storedNews.length,
        articles: storedNews
      });

    }
    const response = await axios.get(

      `https://newsapi.org/v2/everything?q=${topic}&language=en&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`

    );

    const articles = response.data.articles;

    const category =
      getCategoryFromTopic(topic);



    for (const article of articles) {

      try {

        const exists =
          await ExternalNews.findOne({
            articleUrl: article.url,
          });



        if (exists) continue;


        await ExternalNews.create({

          title:
            removeHtml(
              article.title || ""
            ),

          description:
            removeExtraChars(
              removeHtml(
                article.description || ""
              )
            ),

          content:
            removeExtraChars(
              removeHtml(
                article.content || ""
              )
            ),

          imageUrl:
            article.urlToImage || "",

          articleUrl:
            article.url || "",

          source:
            article.source?.name || "",

          topic: topic,

          category,

          stateName,

          publishedAt:
            article.publishedAt,

        });



      }

      catch (error) {

        console.log(
          "News Save Error:",
          error.message
        );

      }

    }

    res.status(200).json({
      success: true,
      totalResults: response.data.totalResults,
      articles: response.data.articles
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error.message
    });

  }

};

const getNewsByCategory = async (
  req,
  res
) => {

  try {

    const category =
      req.params.category;

    console.log(
      "Fetching News From MongoDB:",
      category
    );

    const news =
      await ExternalNews.find({
        category,
        status: "published"
      })
        .sort({
          publishedAt: -1
        });

    res.status(200).json({
      success: true,
      totalResults:
        news.length,
      articles: news
    });

  }

  catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message
    });

  }

};

const getHomeNews = async (
  req,
  res
) => {

  try {

    const news =
      await ExternalNews.find({

        category: {
          $in: [
            "ev",
            "bms",
            "international"
          ]
        },
        status: "published"

      })
        .sort({
          publishedAt: -1
        })
        .limit(200);

    console.log(
      "Home News From MongoDB"
    );

    res.status(200).json({
      success: true,
      totalResults:
        news.length,
      articles: news
    });

  }

  catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message
    });

  }

};

const getStateNews = async (
  req,
  res
) => {

  try {

    const stateName =
      req.params.stateName
        .toLowerCase();

    const news =
      await ExternalNews.find({
        stateName,
        status: "published"
      })
        .sort({
          publishedAt: -1
        });

    res.status(200).json({
      success: true,
      totalResults:
        news.length,
      articles: news
    });

  }

  catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message
    });

  }

};

const searchNews = async (
  req,
  res
) => {

  try {

    const query =
      req.params.query;

    const news =
      await ExternalNews.find({
        status: "published",
        $or: [

          {
            title: {
              $regex: query,
              $options: "i"
            }
          },

          {
            description: {
              $regex: query,
              $options: "i"
            }
          },

          {
            content: {
              $regex: query,
              $options: "i"
            }
          },

          {
            source: {
              $regex: query,
              $options: "i"
            }
          }

        ]

      })
        .sort({
          publishedAt: -1
        });

    res.status(200).json({

      success: true,

      totalResults:
        news.length,

      articles: news

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};

const getTrendingNews = async (
  req,
  res
) => {

  try {

    const news =
      await ExternalNews.find({
        status: "published"
      })

        .sort({
          publishedAt: -1
        })

        .limit(100);

    res.status(200).json({

      success: true,

      articles: news

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};

const markFeatured = async (
  req,
  res
) => {

  try {

    const news =
      await ExternalNews.findById(
        req.params.id
      );

    news.featured =
      !news.featured;

    await news.save();

    res.status(200).json({

      success: true,

      news

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};

const markEditorPick = async (
  req,
  res
) => {

  try {

    const news =
      await ExternalNews.findById(
        req.params.id
      );

    news.editorPick =
      !news.editorPick;

    await news.save();

    res.status(200).json({

      success: true,

      news

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};

const getFeaturedNews = async (
  req,
  res
) => {

  try {

    const news =
      await ExternalNews.find({

        featured: true,
        status: "published"

      })

        .sort({
          publishedAt: -1
        });

    res.status(200).json({

      success: true,

      articles: news

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};

const getEditorPicks = async (
  req,
  res
) => {

  try {

    const news =
      await ExternalNews.find({

        editorPick: true,
        status: "published"

      })

        .sort({
          publishedAt: -1
        });

    res.status(200).json({

      success: true,

      articles: news

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};

const getAllExternalNews = async (
  req,
  res
) => {

  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 50;

    const filter =
      req.query.filter || "all";

    let query = {
      status: "published"
    };
    if (
      filter === "featured"
    ) {

      query.featured = true;

    }

    if (
      filter === "editor"
    ) {

      query.editorPick = true;

    }
    const skip =
      (page - 1) * limit;

    const totalArticles =
      await ExternalNews.countDocuments(query);

    const totalNewsCount =
      await ExternalNews.countDocuments({
        status:"published"
      });

    const featuredCount =
      await ExternalNews.countDocuments({
        featured: true
      });

    const editorPickCount =
      await ExternalNews.countDocuments({
        editorPick: true
      });

    const totalPages =
      Math.ceil(
        totalArticles / limit
      );


    const news =
      await ExternalNews.find(query)

        .sort({
          publishedAt: -1
        })

        .skip(skip)

        .limit(limit);

    res.status(200).json({

      success: true,

      articles: news,

      totalArticles,

      totalNewsCount,

      featuredCount,

      editorPickCount,

      currentPage: page,

      totalPages

    });

  }


  catch (error) {


    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};

const deleteExternalNews =
  async (req, res) => {

    try {

      await ExternalNews.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({

        success: true,

        message:
          "News Deleted"

      });

    }

    catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message

      });

    }

  };

  const getRawNews = async (
  req,
  res
) => {

  try {

    const news =
      await ExternalNews.find({

        status: "raw"

      })

      .sort({
        publishedAt: -1
      });

    res.status(200).json({

      success: true,

      articles: news

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

const submitDraft = async (
  req,
  res
) => {

  try {

    const news =
      await ExternalNews.findById(
        req.params.id
      );

    if (!news) {

      return res.status(404).json({

        success: false,

        message:
          "News not found"

      });

    }

    news.status =
      "pending";

    await news.save();

    res.status(200).json({

      success: true,

      message:
        "Sent To Admin",

      news

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};
const getPublishedCount =
  async (req, res) => {

    try {

      const count =
        await ExternalNews.countDocuments({

          status: "published",

          aiTitle: {
            $exists: true,
            $ne: null
          }

        });

      res.status(200).json({

        success: true,

        count

      });

    }

    catch (error) {

      res.status(500).json({

        success: false,

        message: error.message

      });

    }

};

const getSubmittedCount = async (
  req,
  res
) => {

  try {

    const count =
      await ExternalNews.countDocuments({

        status: "pending",

        aiTitle: {
          $exists: true,
          $ne: null
        }

      });

    res.status(200).json({

      success: true,

      count

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

const getPendingExternalNews =
  async (req, res) => {

    try {

      const news =
        await ExternalNews.find({

          status: "pending"

        })

        .sort({
          createdAt: -1
        });

      res.status(200).json(news);

    }

    catch (error) {

      res.status(500).json({

        error: error.message

      });

    }

};

const approveExternalNews =
  async (req, res) => {

    try {

      const news =
        await ExternalNews.findById(
          req.params.id
        );

      if (!news) {

        return res.status(404).json({
          message:
            "News not found"
        });

      }

      // Copy AI content into main fields

      if (news.aiTitle) {
        news.title =
          news.aiTitle;
      }

      if (news.aiSummary) {
        news.description =
          news.aiSummary;
      }

      if (news.aiContent) {
        news.content =
          news.aiContent;
      }

      news.status =
        "published";

      await news.save();

      res.status(200).json({

        success: true,

        message:
          "News approved",

        news

      });

    }

    catch (error) {

      res.status(500).json({

        error:
          error.message

      });

    }

};

const rejectExternalNews =
  async (req, res) => {

    try {

      const news =
        await ExternalNews.findById(
          req.params.id
        );

      if (!news) {

        return res.status(404).json({
          message:
            "News not found"
        });

      }

      news.status =
        "rejected";

      await news.save();

      res.status(200).json({

        success: true,

        message:
          "News rejected",

        news

      });

    }

    catch (error) {

      res.status(500).json({

        error:
          error.message

      });

    }

};

const getDraftNews =
  async (req, res) => {

    try {

      const news =
        await ExternalNews.find({

          status: "draft"

        })

        .sort({
          createdAt: -1
        });

      res.status(200).json(news);

    }

    catch (error) {

      res.status(500).json({

        error:
          error.message

      });

    }

};
const updateDraft = async (req, res) => {

  try {

    const updatedDraft =
      await ExternalNews.findByIdAndUpdate(

        req.params.id,

        {
          aiTitle: req.body.aiTitle,
          aiSummary: req.body.aiSummary,
          aiContent: req.body.aiContent,
          category: req.body.category,
          imageUrl: req.body.imageUrl
        },

        {
          new: true
        }

      );

    res.status(200).json({

      success: true,

      draft: updatedDraft

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

const getPublishedNews =
  async (req, res) => {

    try {

      const news =
        await ExternalNews.find({

          status: "published",

          aiTitle: {
            $exists: true
          }

        })

        .sort({
          updatedAt: -1
        })

        .limit(10);

      res.status(200).json(news);

    }

    catch (error) {

      res.status(500).json({

        error: error.message

      });

    }

};

const getNewsById = async (req, res) => {

  try {

    const article =
      await ExternalNews.findById(
        req.params.id
      );

    if (!article) {

      return res.status(404).json({

        success: false,

        message: "Article not found"

      });

    }

    const relatedArticles =
      await ExternalNews.find({

        _id: {
          $ne: article._id
        },

        category: article.category,

        status: "published"

      })

      .sort({

        publishedAt: -1

      })

      .limit(12);

    res.status(200).json({

      success: true,

      article,

      relatedArticles

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

const incrementViews = async (req, res) => {

  try {
    const article =
      await ExternalNews.findByIdAndUpdate(

        req.params.id,

        {
          $inc: {
            views: 1
          }
        },

        {
          new: true
        }

      );


    if (!article) {

      return res.status(404).json({

        success: false,

        message: "Article not found"

      });

    }

    res.status(200).json({

      success: true,

      views: article.views

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


module.exports = {
  getNewsByTopic,
  getNewsByCategory,
  getHomeNews,
  getStateNews,
  searchNews,
  getTrendingNews,
  markFeatured,

  markEditorPick,
  getFeaturedNews,
  getEditorPicks,
  getAllExternalNews, deleteExternalNews,getRawNews,submitDraft,
  getPendingExternalNews,approveExternalNews,rejectExternalNews,
  getDraftNews,updateDraft,getPublishedCount,getSubmittedCount,getPublishedNews,incrementViews,
  getNewsById

};