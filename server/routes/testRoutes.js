const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");


// ADMIN ROUTE
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {

    res.json({
      message: "Welcome Admin"
    });

  }
);


// EDITOR ROUTE
router.get(
  "/editor",
  authMiddleware,
  roleMiddleware("editor", "admin"),
  (req, res) => {

    res.json({
      message: "Welcome Editor"
    });

  }
);

module.exports = router;