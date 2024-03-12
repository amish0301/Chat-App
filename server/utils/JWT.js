const jwt = require("jsonwebtoken");
require("dotenv").config({path: "./.env"});

const cookieOptions = {
  // 15 days of expiration
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res
    .status(code)
    .cookie("uid", token, cookieOptions)
    .json({
      success: true,
      message,
    });
};

module.exports = { sendToken };
