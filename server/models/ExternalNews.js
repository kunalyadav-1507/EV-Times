const mongoose = require("mongoose");

const externalNewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    content: {
      type: String,
      default: "",
    },

    imageUrl: {
      type: String,
      default: "",
    },

    articleUrl: {
      type: String,
      unique: true,
      required: true,
    },

    source: {
      type: String,
      default: "",
    },

    topic: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "general",
    },
    stateName: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false
    },

    editorPick: {
      type: Boolean,
      default: false
    },

    views: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: [
        "raw",
        "draft",
        "pending",
        "published",
        "rejected"
      ],
      default: "raw"
    },

    aiTitle: {
      type: String,
      default: ""
    },

    aiSummary: {
      type: String,
      default: ""
    },

    aiContent: {
      type: String,
      default: ""
    },

    processed: {
      type: Boolean,
      default: false
    },

    publishedAt: {
      type: Date,
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ExternalNews",
  externalNewsSchema
);