const express = require("express");
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

//Custom middleware functions
const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Email or username is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors,
];

//restore user 
router.get("/", (req, res, next) => {
  const { user } = req;
  if (user) user.token = req.cookies.token;
  if (user) {
    res.json(user.toSafeObject());
  } else return res.json(null);
});

 //login 
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;
  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    return next(err);
  }

  const token = await setTokenCookie(res, user);

  user.token = token;
  return res.json(user.toSafeObject());
});


router.delete("/", (req, res, next) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

module.exports = router;
