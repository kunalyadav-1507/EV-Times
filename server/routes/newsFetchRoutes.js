const express = require("express");

const router = express.Router();

const fetchAllNews =
  require("../jobs/fetchAllNews");

router.get(
  "/fetch-all-news",
  async (req, res) => {

    try {

      await fetchAllNews();

      res.status(200).json({
        success: true,
        message:
          "News fetched successfully"
      });

    }

    catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);

module.exports = router;