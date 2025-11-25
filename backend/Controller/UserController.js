const User = require("../Models/User");

exports.userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    next();
  } catch (err) {
    return res.status(400).json({
      error: "User not found",
    });
  }
};
