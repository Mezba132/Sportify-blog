const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../Helper/ErrorHandler");

exports.signup = async (req, res) => {
  try {
    if (req.body.email) {
      const existingUser = await User.findOne({ email: req.body.email }).exec();
      if (existingUser) {
        return res.status(400).json({
          err: "Email is taken",
        });
      }
    }
    const user = new User(req.body);
    await user.save();

    user.salt = undefined;
    user.hash_password = undefined;
    res.json({
      user,
    });
  } catch (err) {
    return res.status(400).json({
      err: errorHandler(err),
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(400).json({
        err: "please sign up",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        err: "Email and Password dont match",
      });
    }

    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET
    );
    res.cookie("CookieToken", token, { expire: new Date() + 9999 });
    return res.json({ token });
  } catch (err) {
    return res.status(400).json({
      err: errorHandler(err),
    });
  }
};

exports.signout = (req, res) => {
  try {
    res.clearCookie("CookieToken");
    res.json({ message: "Signout Successfully" });
  } catch (err) {
    return res.status(400).json({
      err: errorHandler(err),
    });
  }
};
