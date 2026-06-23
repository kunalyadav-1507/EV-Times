const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {

  saveArticle,

  getSavedArticles,

  deleteSavedArticle

} = require(

  "../controllers/savedNewsController"

);
router.get("/test", (req, res) => {

  res.send("Saved route works");

});

// SAVE ARTICLE
router.post(

  "/save",

  authMiddleware,

  saveArticle

);


// GET SAVED ARTICLES
router.get(

  "/",

  authMiddleware,

  getSavedArticles

);

// DELETE SAVED ARTICLE
router.delete(

  "/:id",

  authMiddleware,

  deleteSavedArticle

);

module.exports = router;