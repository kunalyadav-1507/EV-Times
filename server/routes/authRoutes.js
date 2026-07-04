const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,checkEmail,verifyOTP
} = require("../controllers/authController");


router.post("/register", registerUser);

router.post("/login", loginUser);
router.post(
   "/check-email",
   checkEmail
);
router.post(
  "/verify-otp",
  verifyOTP
);

module.exports = router;