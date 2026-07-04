const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
  type: String,
  enum: ["admin", "editor"],
  default: "editor"
},

resetOTP: {
  type: String,
  default: null
},

otpExpires: {
  type: Date,
  default: null
},
otpVerified: {
  type: Boolean,
  default: false
}

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);