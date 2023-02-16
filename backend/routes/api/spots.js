const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
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

const { check, Result } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { route } = require("./users");
const spot = require("../../db/models/spot.js");
const e = require("express");

// const spot = require("../../db/models/spots");
const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat").exists({ checkFalsy: true }),
  check("lng")
    .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 49 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .withMessage("Stars is required")
    .isLength({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

//? get spots of current user
router.get("/current", requireAuth, async (req, res, next) => {
  const ownerId = req.user.id;
  const spots = await Spot.findAll({
    where: {
      ownerId: ownerId,
    },

  });

  const spotArr = [];
  for (let i = 0; i < spots.length; i++) {
    let spot = spots[i];
    spot = spot.toJSON();

    console.log(spot);

    const starRatings = await Review.findAll({
      where: {
        spotId: spot.id,
      },
      attributes: [[Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"]],
    });

    spot.avgRating = Number(starRatings[0].toJSON().avgRating);

    const image = await SpotImage.findOne({
      where: { spotId: spot.id, preview: true },
      attributes: ["url"],
    });

    if(image) {
      spot.previewImage = image.url
    } else {
      spot.previewImage = "No preview image available" 
    }
    console.log(image)

    spotArr.push(spot);
  }

  res.status(200)
  res.json({ 
    Spots: spotArr 
  });
});

//? GET ALL SPOTS // returns all spots

router.get("/", async (req, res) => {
  let { page, size } = req.query;
  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 20;
  }

  page = parseInt(page);  
  size = parseInt(size);

  let pagination = {};

  if (size >= 1 && page >= 1) {
    pagination.limit = size;
    pagination.offset = size * (page - 1);
  } else {
    res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        page: "Page must be greater than or equal to 0",
        size: "Size must be greater than or equal to 0",
        maxLat: "Maximum latitude is invalid",
        minLat: "Minimum latitude is invalid",
        minLng: "Maximum longitude is invalid",
        maxLng: "Minimum longitude is invalid",
        minPrice: "Maximum price must be greater than or equal to 0",
        maxPrice: "Minimum price must be greater than or equal to 0",
      },
    });
  }

  const spots = await Spot.findAll({
    ...pagination,
  });

  let spotsArr = [];

  for (let spot of spots) {
    spot = spot.toJSON()
    const rating = await Review.findAll({
      where: {
        spotId: spot.id,
      },
      attributes: [[Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"]],
      raw: true,
    });
  
    spot.avgRating = Number(rating[0].avgRating);
    if(!spot.avgRating) {
      spot.avgRating = "New!"
    }
   
    const imageURL = await SpotImage.findOne({
      where: {
        spotId: spot.id,
        preview: true
      },
      attributes: ['url']
    })

    if(imageURL) {
      spot.previewImage = imageURL.url
    } else {
      spot.previewImage = "No preview image available"
    }
    spotsArr.push(spot);
  }

  res.json({ Spots: spotsArr, page, size });
});

//? Get details of a spot from an ID

router.get("/:spotId", async (req, res) => {
  const { spotId } = req.params;

  const spots = await Spot.findByPk(spotId, {
    include: [
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
    ],
  });
  if (!spots) {
    res.status(404);
    res.json({ 
      message: "Spot can't be found", 
      statusCode: 404 
    });
  }

  const reviewCount = await Review.count({where: { spotId: spotId }})
  const starTotal = await Review.sum('stars', { where: {spotId: spotId}})

  // const spotImage = await SpotImage.findAll({where: {spotId: spotId},attributes: ['id', 'url', 'preview']})

  const spotOwner = await User.findByPk(spots.ownerId, {
    attributes: ['id','firstName', 'lastName']
  })

  let avgRating;
  if(starTotal === null) {
    avgRating = 0
  } else {
    avgRating = (starTotal / reviewCount)
  }

  const spotDetails = spots.toJSON()

 spotDetails.numReviews = reviewCount
 spotDetails.avgStarRating = avgRating
 spotDetails.spotImage = SpotImage
 spotDetails.Owner = spotOwner

 res.json(spotDetails)
});

//? Create a spot

router.post("/", validateSpot, requireAuth, async (req, res) => {
  const ownerId = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const mySpot = await Spot.create({ ownerId, ...req.body });
  res.json(mySpot);
});

//? create an image for a spot

router.post("/:spotId/images", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  const { url, preview } = req.body;

  if (!spot) {
    res.status(404);
    res.json({ message: "Spot couldn't be found", statusCode: 404 });
  }

  const spotImage = await SpotImage.create({
    spotId: spot.id,
    url,
    preview,
  });

  // if (!spotImage) {
  //   res.status(400);
  //   res.json({
  //     message: "Need to provide url and preview",
  //   });
  // }

  // const spotImages = await SpotImage.findOne({
  //   where: {
  //     spotId: req.params.spotId,
  //   },
  // });

  // if (!spotImages) {
  //   res.status(404);
  //   res.json({
  //     message: "Image for this spot wasn't created",
  //   });
  // }
  res.json({
    id: spotImage.id,
    url: spotImage.url,
    preview: spotImage.preview,
  });
});

//? edit a spot

router.put("/:spotId", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const mySpot = await Spot.findByPk(spotId);

  if (!mySpot) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  {
    if (address) mySpot.address = address;
    if (city) mySpot.city = city;
    if (state) mySpot.state = state;
    if (country) mySpot.country = country;
    if (lat) mySpot.lat = lat;
    if (lng) mySpot.lng = lng;
    if (name) mySpot.name = name;
    if (description) mySpot.description = description;
    if (price) mySpot.price = price;
  }

  await mySpot.save();
  res.json(mySpot);
});

//? delete a spot

router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const spotId = await Spot.findByPk(req.params.spotId, {
    where: {
      userId: req.user.id,
    },
  });

  if (!spotId) {
    res.status(404);
    res.json({
      message: "Spot cannot be found",
      statusCode: 404,
    });
  }

  await spotId.destroy();
  res.status(200),
    res.json({
      message: "successfully deleted",
      statusCode: 200,
    });
});

//? Get all Reviews by a Spot's id

router.get("/:spotId/reviews", async (req, res, next) => {
  const spots = await Spot.findByPk(req.params.spotId);

  if (!spots) {
    res.status(404);
    res.json({
      message: "Spot cannot be found",
      statusCode: 404,
    });
  }

  const allReviews = await Review.findAll({
    where: {
      spotId: req.params.spotId,
    },
    include: [
      {
        model: User,
      },
      {
        model: ReviewImage,
        attributes: {exclude : ['reviewId', 'createdAt' ,'updatedAt']}
      },
    ],
  });
  res.json({
    Reviews: allReviews,
  });
});

//? Create a Review for a Spot based on the Spot's id

router.post(
  "/:spotId/reviews",
  validateReview,
  requireAuth,
  async (req, res) => {
    const userId = req.user.id;
    const spotId = req.params.spotId;
    const { review, stars } = req.body;

    const mySpot = await Spot.findByPk(spotId);

    if (!mySpot) {
      res.status(404);
      res.json({
        message: "Spot couldn't be found",
        statusCode: 404,
      });
    }
    const myReview = await Review.findOne({
      where: {
        userId,
        spotId,
      },
    });
    if (myReview) {
      res.status(403);
      res.json({
        message: "User already has a review for this spot",
        statusCode: 403,
      });
    } else {
      const newReview = await Review.create({
        userId,
        spotId,
        review,
        stars,
      });
      res.json(newReview);
    }
  }
);

//? get all bookings based on spot id

router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const { user } = req;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.status(404);
    res.json({
      message: "Spot could not be found",
      statusCode: 404,
    });
  }
  const bookings = await Booking.findAll({
    where: {
      spotId: spotId,
    },
    attributes: ["spotId", "startDate", "endDate"],
  });

  const myBookings = await Booking.findAll({
    where: {
      spotId: spotId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });
  const bookingsArr = [];

  bookingsArr.forEach((booking) => {
    bookingsArr.push(booking.toJSON());
  });

  const mySpotArr = [];

  mySpotArr.forEach((mySpot) => {
    mySpotArr.push(mySpot.toJSON());
  });

  if (spot.ownerId === user.id) {
    res.json({ Bookings: myBookings });
  } else {
    res.json({ Bookings: bookings });
  }
});

//? create a booking based on spot id
router.post("/:spotId/bookings", requireAuth, async (req, res) => {
  const { startDate, endDate } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const myBooking = await Booking.findAll({
    where: {
      spotId: spot.id,
    },
  });

  if ((new Date (startDate).getTime() < new Date().getTime()) || (new Date (endDate).getTime() < new Date().getTime())) {
     res.status(403);
     return res.json({
       message: "Cannot be created in the past",
       statusCode: 403,
       errors: {
         endDate: "Cannot be created in the past",
         startDat: "Cannot be created in the past"
       },
     });
  }

  if (!startDate || !endDate || endDate <= startDate) {
    res.status(403);
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot be on or before startDate",
      },
    });
  }

  for (let booking of myBooking) {
    if (
      (Date.parse(startDate) >= Date.parse(booking.startDate) && Date.
      parse(endDate) <= Date.parse(booking.endDate))
    ) {
      res.status(403);
      return res.json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }
  }
  // console.log("xxxxxxxxxxx",res.json().message )
  const newBooking = await Booking.create({
    spotId: spot.id,
    userId: req.user.id,
    startDate: startDate,
    endDate: endDate,
  });
 return res.json(newBooking);
});

module.exports = router;
