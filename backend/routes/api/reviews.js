const express = require("express");

const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
const {
  User,
  Spot,
  Review,
  SpotImage,
  sequelize,
  ReviewImage,
} = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");

const router = express.Router();

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required")
    .isLength({ min: 0 })
    .isLength({ max: 255 })
    .withMessage("Review must be 255 characters or less"),
  check("stars")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

//? Get all Reviews of the Current User

router.get("/current", requireAuth, async (req, res, next) => {
  const reviews = await Review.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Spot,
        attributes: { 
          exclude: ['createdAt', 'updatedAt']
        }
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });
  // let imageArr = []

  // for(let review of reviews ){
  //   review = review.toJSON()
  //   const image = await SpotImage.findByPk(review.id, {
  //     where: {
  //       preview: true
  //     },
  //     attributes: ['url']
  //   })
  //   if(image) {
  //     review.SpotImage.previewImage = image.dataValues.url
  //   } 
  //   imageArr.push(review)
  // }
  return res.json({Reviews: reviews});
});

//? Add an Image to a Review based on the Review's id

router.post(
  "/:reviewId/images",
  requireAuth,
  async (req, res, next) => {
    const { url } = req.body;
    const reviewId = req.params.reviewId;

    const review = await Review.findByPk(reviewId, {
      where: {
        userId: req.user.id
      }
    });

    if (!review) {
      res.status(404);
      res.json({
        message: "Review couldn't be found",
        statusCode: 404,
      });
    }

    // if (review.userId !== req.user.id) {
    //   res.status(403);
    //   res.json({
    //     message: "Forbidden",
    //     statusCode: 403,
    //   });
    // }
    const reviewImage = await ReviewImage.findAll({
      where: {
        reviewId: reviewId
      },
    });
    if (reviewImage > 10) {
      res.status(403);
      res.json({
        message: "Maximum number of images for this resource was reached",
        statusCode: 403,
      });
    }
    const firstReviewImage = await ReviewImage.create({
      reviewId: reviewId,
      url: url,
    });
    res.status(200);
    res.json({
      id: firstReviewImage.id,
      url: firstReviewImage.url,
    });
  }
);

//? edit a review

//? edit a review
router.put("/:reviewId", validateReview, requireAuth, async (req, res) => {
  const userId = req.user.id;
  const reviewId = req.params.reviewId;
  const { review, stars } = req.body;

  // Find the review by its ID and the user ID
  const updateReview = await Review.findOne({
    where: {
      id: reviewId,
      userId: userId
    }
  });

  // If the review doesn't exist or doesn't belong to the user, return an error
  if (!updateReview) {
    res.status(404);
    return res.json({
      message: "Review could not be found",
      statusCode: 404,
    });
  }

  // Update the review fields if provided
  if (review) updateReview.review = review;
  if (stars) updateReview.stars = stars;

  // Save the updated review
  await updateReview.save();

  // Return the updated review in the response
  res.json(updateReview);
});


//? delete a review

router.delete("/:reviewId", requireAuth, async (req, res, next) => {
  const { user } = req;
  const deleteReview = await Review.findByPk(req.params.reviewId, {
    where: {
      userId: req.user.id
    }
  });

  // if (user.id !== deleteReview.userId) {
  //   res.json({
  //     message: "Forbidden",
  //     statusCode: 403,
  //   });
  // }
  if (!deleteReview) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }
  await deleteReview.destroy();
  return res.json({
    message: "Successfully deleted",
    statusCode: 404,
  });
});

module.exports = router;
