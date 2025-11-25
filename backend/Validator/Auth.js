const { check, validationResult } = require("express-validator");

exports.userSignupValidator = [
  check("name").notEmpty().withMessage("Name is required"),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,15})+$/)
    .withMessage("Valid Email is required")
    .isLength({ min: 4, max: 32 })
    .withMessage("Email must be between 3 to 32 characters"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/)
    .withMessage(
      "Password must be at least 4 characters and contain 1 letter & 1 number"
    )
    .isLength({ min: 4, max: 50 })
    .withMessage("Password must be between 4 to 50 characters"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        err: errors.array()[0].msg,
      });
    }

    next();
  },
];

exports.userSigninValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,15})+$/)
    .withMessage("Valid Email is required")
    .isLength({ min: 4, max: 32 })
    .withMessage("Email must be between 3 to 32 characters"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 4, max: 50 })
    .withMessage("Password must be between 4 to 50 characters"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        err: errors.array()[0].msg,
      });
    }

    next();
  },
];
