const express = require("express");
const router = express.Router();
const {
  userSignupValidator,
  userSigninValidator,
} = require("../Validator/Auth");
const { signup, signin, signout } = require("../Controller/AuthController");

router.post("/auth/signup", userSignupValidator, signup);
router.post("/auth/signin", userSigninValidator, signin);
router.get("/auth/signout", signout);

module.exports = router;
