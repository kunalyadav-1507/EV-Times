const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER
const registerUser = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};


// LOGIN
const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};



const checkEmail = async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({

        success: false,
        message: "Email not found"

      });

    }

    const otp = Math.floor(
  100000 + Math.random() * 900000
).toString();

user.resetOTP = otp;

user.otpExpires =
  new Date(Date.now() + 10 * 60 * 1000);

user.otpVerified = false;

await user.save();

console.log("OTP:", otp);

res.status(200).json({

  success: true,

  message: "OTP Generated"

});

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,
      message: "Server Error"

    });

  }

};

const verifyOTP = async (req, res) => {

  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User not found"

      });

    }

    if (user.resetOTP !== otp) {

      return res.status(400).json({

        success: false,

        message: "Invalid OTP"

      });

    }

    if (user.otpExpires < new Date()) {

      return res.status(400).json({

        success: false,

        message: "OTP Expired"

      });

    }

    user.otpVerified = true;

await user.save();

    res.status(200).json({

      success: true,

      message: "OTP Verified"

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error"

    });

  }

};

const resetPassword = async (req, res) => {

  try {

    const {
      email,
      newPassword
    } = req.body;

    const user = await User.findOne({ email });
    if (!user.otpVerified) {

  return res.status(400).json({

    success: false,

    message: "OTP verification required"

  });

}

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found"
      });

    }

    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    // Clear OTP after successful reset
    user.resetOTP = null;

user.otpExpires = null;

user.otpVerified = false;

    await user.save();

    res.status(200).json({

      success: true,

      message: "Password Updated Successfully"

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error"

    });

  }

};

module.exports = {
  registerUser,
  loginUser,checkEmail,verifyOTP,resetPassword
};