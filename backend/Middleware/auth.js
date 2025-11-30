const { expressjwt } = require("express-jwt");

exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "auth",
});

exports.isAdmin = (req, res, next) => {
  if (!req.auth || req.auth.role !== "Admin") {
    return res.status(403).json({
      error: "Admin resource! Access denied",
    });
  }
  next();
};
