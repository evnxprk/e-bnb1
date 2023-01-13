const express = require("express");
const router = express.Router();
const {
  Spot,
  SpotImage,
  Review,
  User,
  ReviewImage,
  Booking,
} = require("../../db/models");
const Sequelize = require("sequelize");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

//? delete a review image
router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const reviewImage = await ReviewImage.findByPk(req.params.imageId);
  if (!reviewImage) {
    res.status(404);
    res.json({
      message: "Review Image could not be found",
      statusCode: 404,
    });
  }
await reviewImage.destroy()
res.json({
    message: "Successfully deleted",
    statusCode: 200
})
});

module.exports = router;
