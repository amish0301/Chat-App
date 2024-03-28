const jwt = require("jsonwebtoken");
const { ErrorHandler } = require("../utils/ErrorHandler");
const { adminSecretKey } = require("../constants/data");

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

const adminAuth = (req, res, next) => {
  try {
    const token = req.cookies["adminToken"];
    if (!token) return next(new ErrorHandler("Only Admins can access", 401));

    const secretKey = jwt.verify(token, process.env.JWT_SECRET);

    if (secretKey !== adminSecretKey)
      return next(new ErrorHandler("You are not authorized to access", 401));

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isAuthenticated, adminAuth };
