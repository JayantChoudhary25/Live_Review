const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
} = require("../controller/reviewController");

router.get("/", getAllReviews);
router.post("/", createReview);
router.get("/:id", getReviewById);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

module.exports = router;
