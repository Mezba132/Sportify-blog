const express = require("express");
const router = express.Router();
const {
  userSignupValidator,
  userSigninValidator,
} = require("../Validator/Auth");
const { signup, signin, signout } = require("../Controller/AuthController");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", userSigninValidator, signin);
router.get("/signout", signout);

module.exports = router;
