const News = require("../models/News");


// CREATE NEWS
const createNews = async (req, res) => {

  try {

    const { title, content, category } = req.body;

    const news = await News.create({

      title,
      content,
      category,

      author: req.user.id,

      status: "pending"

    });

    res.status(201).json({
      message: "News created successfully",
      news
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};


// GET ALL APPROVED NEWS
const getAllNews = async (req, res) => {

  try {

    const news = await News.find({
      status: "approved"
    }).populate("author", "name email");

    res.status(200).json(news);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};


// GET SINGLE NEWS
const getSingleNews = async (req, res) => {

  try {

    const news = await News.findById(req.params.id)
    .populate("author", "name email");

    if (!news) {
      return res.status(404).json({
        message: "News not found"
      });
    }

    res.status(200).json(news);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};


// UPDATE NEWS
const updateNews = async (req, res) => {

  try {

    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        message: "News not found"
      });
    }

    if (news.author.toString() !== req.user.id) {

      return res.status(403).json({
        message: "Unauthorized"
      });

    }

    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedNews);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};


// DELETE NEWS
const deleteNews = async (req, res) => {

  try {

    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        message: "News not found"
      });
    }

    await news.deleteOne();

    res.status(200).json({
      message: "News deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

const getPendingNews = async (req, res) => {

  try {

    const news = await News.find({
      status: "pending"
    }).populate("author", "name email");

    res.status(200).json(news);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

const approveNews = async (req, res) => {

  try {

    const news = await News.findByIdAndUpdate(

      req.params.id,

      {
        status: "approved"
      },

      {
        new: true
      }

    );

     if (!news) {

      return res.status(404).json({
        message: "News not found"
      });

    }

    res.status(200).json({
      message: "News approved successfully",
      news
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

const getApprovedNews = async (req, res) => {

  try {

    const news = await News.find({

      status: "approved"

    }).sort({ createdAt: -1 });


    res.json(news);

  }

  catch (error) {

    res.status(500).json({

      error: error.message

    });

  }

};

const rejectNews = async (req, res) => {

  try {

    const news = await News.findByIdAndUpdate(

      req.params.id,

      {
        status: "rejected"
      },

      {
        new: true
      }

    );

    res.status(200).json({
      message: "News rejected",
      news
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};
module.exports = {
  createNews,
  getAllNews,
  getSingleNews,
  updateNews,
  deleteNews,
  getPendingNews,
  approveNews,
  getApprovedNews,
  rejectNews
};