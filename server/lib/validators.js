const { body, validationResult, check } = require("express-validator");
const { ErrorHandler } = require("../utils/ErrorHandler");

const registerValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("username", "Please Enter User Name").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
  body("bio", "Please Enter Bio").notEmpty(),
  body("avatar", "Please Enter Avatar").notEmpty(),
];

const loginValidator = () => [
  body("username", "Please Enter User Name").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);
  const allErrors = errors
    .array()
    .map((err) => err.msg)
    .join(", ");

  if (errors.isEmpty()) return next();
  else return next(new ErrorHandler(allErrors, 400));
};

module.exports = { registerValidator, loginValidator, validateHandler };
