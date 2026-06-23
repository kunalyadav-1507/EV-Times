const express = require("express");

const router = express.Router();

const {
  createNews,
  getAllNews,
  getSingleNews,
  updateNews,
  deleteNews,
  getPendingNews,
  approveNews,
  getApprovedNews,
  rejectNews
} = require("../controllers/newsController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");


// CREATE NEWS
router.post(
  "/create",
  authMiddleware,
  roleMiddleware("editor", "admin"),
  createNews
);

router.get(
  "/pending/all",
  authMiddleware,
  roleMiddleware("admin"),
  getPendingNews
);

router.put(
  "/approve/:id",
  authMiddleware,
  roleMiddleware("admin"),
  approveNews
);

router.put(
  "/reject/:id",
  authMiddleware,
  roleMiddleware("admin"),
  rejectNews
);


// GET ALL NEWS
router.get("/", getAllNews);

router.get(

  "/approved",

  getApprovedNews

);



// GET SINGLE NEWS
router.get("/:id", getSingleNews);



// UPDATE NEWS
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("editor", "admin"),
  updateNews
);


// DELETE NEWS
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteNews
);

module.exports = router;