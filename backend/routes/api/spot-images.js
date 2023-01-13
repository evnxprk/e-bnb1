const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { requireAuth, restoreUser } = require("../../utils/auth.js");
const {
  User,
  Spot,
  Booking,
  SpotImage,
  ReviewImage,
  Review,
} = require("../../db/models");
 //? delete a spot image 
router.delete("/:imageId", restoreUser, requireAuth, async (req, res, next) => {
  const spotId  = req.params.imageId
  // console.log(req.params)
  const spotImage = await SpotImage.findByPk(spotId);
if(!spotImage) {
  res.status(404)
  res.json({
    message: "Spot Image could not be found",
    statusCode: 404
  })
}
  await spotImage.destroy()
  res.json({
    message: "Successfully deleted",
    statusCode: 200
  })
});

module.exports = router;
