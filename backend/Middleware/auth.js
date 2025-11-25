const { expressjwt } = require("express-jwt");
const { errorHandler } = require("../Helper/ErrorHandler");

exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  try {
    const authorized =
      req.profile && req.auth && req.profile._id.toString() === req.auth._id;
    if (!authorized) {
      return res.status(403).json({
        error: "Access denied",
      });
    }
    next();
  } catch (err) {
    return res.status(400).json({
      err: errorHandler(err),
    });
  }
};
