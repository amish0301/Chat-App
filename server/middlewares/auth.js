const jwt = require("jsonwebtoken");
const { ErrorHandler } = require("../utils/ErrorHandler");

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.uid;
    if (!token) return next(new ErrorHandler("Please Login First", 401));

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodeData._id;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isAuthenticated };
