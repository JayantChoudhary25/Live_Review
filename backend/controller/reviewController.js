const Review = require("../models/review");
const socketModule = require("../utils/socketio");

// Get all reviews with pagination and search
exports.getAllReviews = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = "" } = req.query;
    const skip = (page - 1) * limit;

    // Create a search query based on the title field
    const searchQuery = { title: { $regex: new RegExp(search, "i") } };

    const reviews = await Review.find(searchQuery)
      .sort({ datetime: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalReviews = await Review.countDocuments(searchQuery);

    res.status(200).json({
      success: true,
      data: reviews,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalReviews / limit),
        totalItems: totalReviews,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Create a new review
exports.createReview = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newReview = new Review({ title, content });
    const savedReview = await newReview.save();

    const io = socketModule.getIO();
    io.emit("newReview", {message: "New Review Added"});

    res.status(201).json({ success: true, data: savedReview });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: "Invalid input data" });
  }
};

// Get a review by ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) throw Error("Review not found");

    res.status(200).json({ success: true, data: review });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, error: "Review not found" });
  }
};

// Update a review by ID
exports.updateReview = async (req, res) => {
  const { title, content } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    const io = socketModule.getIO();
    io.emit("updatedReview", { message: "Review Updated" });

    res.status(200).json({ success: true, data: updatedReview });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: "Invalid input data" });
  }
};

// Delete a review by ID
exports.deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) throw Error("Review not found");

    const io = socketModule.getIO();
    io.emit("deletedReview", { message: "Review deleted" });

    res.status(200).json({ success: true, message: "Review deleted" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, error: "Review not found" });
  }
};
