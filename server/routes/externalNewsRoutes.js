const express = require("express");

const router = express.Router();

const {
  getNewsByTopic,
  getNewsByCategory,
  getHomeNews,getStateNews,searchNews,getTrendingNews,markFeatured,
markEditorPick,getFeaturedNews,getEditorPicks,getAllExternalNews,deleteExternalNews,getRawNews,submitDraft,getPendingExternalNews,
approveExternalNews,rejectExternalNews,getDraftNews,updateDraft,getPublishedCount,getSubmittedCount,getPublishedNews
} = require(
  "../controllers/externalNewsController"
);

const ExternalNews =
  require("../models/ExternalNews");


// TOPIC NEWS
router.get(  "/topic/:topic",
  getNewsByTopic
);

router.get(
  "/category/:category",
  getNewsByCategory
);

router.get(
  "/home-news",
  getHomeNews
);

router.get(
  "/state/:stateName",
  getStateNews
);

router.get(
  "/search/:query",
  searchNews
);

router.get(
  "/trending",
  getTrendingNews
);

router.patch(
  "/featured/:id",
  markFeatured
);

router.patch(
  "/editor-pick/:id",
  markEditorPick
);

router.get(
  "/featured",
  getFeaturedNews
);

router.get(
  "/editor-picks",
  getEditorPicks
);

router.get(
  "/admin/all",
  getAllExternalNews
);

router.delete(
  "/delete/:id",
  deleteExternalNews
);
router.get(
  "/raw",
  getRawNews
);
router.post(
  "/submit/:id",
  submitDraft
);

router.get(
  "/pending",
  getPendingExternalNews
);
router.post(
  "/approve/:id",
  approveExternalNews
);
router.post(
  "/reject/:id",
  rejectExternalNews
);
router.get(
  "/drafts",
  getDraftNews
);
router.put(
  "/draft/:id",
  updateDraft
);
router.get(
  "/published-count",
  getPublishedCount
);

router.get(
  "/submitted-count",
  getSubmittedCount
);
router.get(
 "/published",
 getPublishedNews 
)


module.exports = router;