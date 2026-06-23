const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  generatedByAI: {
    type: Boolean,
    default: false
  },

  status: {
    type: String,
    enum: ["draft", "pending", "approved", "rejected"],
    default: "draft"
  }
 
}, { timestamps: true });

module.exports = mongoose.model("News", newsSchema);