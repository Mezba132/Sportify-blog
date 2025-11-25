const express = require("express");
const router = express.Router();
const { requireSignin, isAuth } = require("../Middleware/auth");
const { userById } = require("../Controller/UserController");

router.get("/user/:id", requireSignin, isAuth, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.param("id", userById);

module.exports = router;
