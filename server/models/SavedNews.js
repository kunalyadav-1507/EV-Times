const mongoose = require("mongoose");


const savedNewsSchema =
  new mongoose.Schema(

    {

      user: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

      },

      title: {

        type: String

      },

      description: {

        type: String

      },

      imageUrl: {

        type: String

      },

      articleUrl: {

        type: String

      }

    },

    {

      timestamps: true

    }

);


module.exports =
  mongoose.model(

    "SavedNews",

    savedNewsSchema

);