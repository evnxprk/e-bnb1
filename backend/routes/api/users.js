// backend/routes/api/users.js
const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email"),
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Username is required"),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last name is required"),
  check("password").exists({ checkFalsy: true }),
  handleValidationErrors,
];

// Sign up
router.post("/", validateSignup, async (req, res, next) => {
  const { email, firstName, lastName, password, username } = req.body;

  const emailValidation = await User.findOne({ where: { email } });
  if (emailValidation) {
    const error = Error("User already exists");
    error.errors = { email: "User with that email already exists" };
    error.status = 403;
    next(error);
  }

  const usernameValidation = await User.findOne({ where: { username } });
  if (usernameValidation) {
    const error = Error("User already exists");
    error.errors = { username: "User with that username already exists" };
    error.status(403);
    next(error);
  }
  const user = await User.signup({
    email,
    username,
    firstName,
    lastName,
    password,
  });

  const token = await setTokenCookie(res, user);

  return res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    token: token,
  });
});

module.exports = router;
