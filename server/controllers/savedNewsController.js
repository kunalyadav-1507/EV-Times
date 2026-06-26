const SavedNews =
  require("../models/SavedNews");


// SAVE ARTICLE
const saveArticle =
  async (req, res) => {

    try {

      const {

        title,

        description,

        imageUrl,

        articleUrl

      } = req.body;


      const savedNews =
        await SavedNews.create({

          user: req.user.id,

          title,

          description,

          imageUrl,

          articleUrl

        });


      res.status(201).json({

        message:
          "Article Saved",

        savedNews

      });

    }

    catch (error) {

      res.status(500).json({

        error: error.message

      });

    }

};


// GET SAVED ARTICLES
const getSavedArticles =
  async (req, res) => {

    try {

      const articles =
        await SavedNews.find({

          user: req.user.id

        });


      res.json(articles);

    }

    catch (error) {

      res.status(500).json({

        error: error.message

      });

    }

};

// DELETE SAVED ARTICLE
const deleteSavedArticle =
  async (req, res) => {

    try {

      await SavedNews.findByIdAndDelete(

        req.params.id

      );


      res.json({

        message:
          "Saved Article Removed"

      });

    }

    catch (error) {

      res.status(500).json({

        error: error.message

      });

    }

};


module.exports = {

  saveArticle,

  getSavedArticles,

  deleteSavedArticle

};