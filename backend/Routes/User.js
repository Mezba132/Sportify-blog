const express = require("express");
const router = express.Router();
const { requireSignin } = require("../Middleware/Auth");
const { userById } = require("../Controller/UserController");

router.get("/user/:userId", requireSignin, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.param("userId", userById);

module.exports = router;
