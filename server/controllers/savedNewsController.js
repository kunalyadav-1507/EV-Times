const saveArticle =
  async (req, res) => {

    try {

      const {

        articleId,

        title,

        description,

        imageUrl,

        articleUrl

      } = req.body;

      const savedNews =
        await SavedNews.create({

          user: req.user.id,

          articleId,

          title,

          description,

          imageUrl,

          articleUrl

        });

      res.status(201).json({

        message: "Article Saved",

        savedNews

      });

    }

    catch (error) {

      res.status(500).json({

        error: error.message

      });

    }

  };