const { User } = require("../models/user");
const { sendToken } = require("../utils/JWT");
const { compare } = require("bcrypt");
const { cookieOptions } = require("../constants/cookie");
const { ErrorHandler } = require("../utils/ErrorHandler");

// SIGN-UP
const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;
  const avatar = {
    public_id: "sample",
    url: "asdsdas",
  };

  const user = await User.create({
    name,
    username,
    password,
    avatar,
    bio,
  });

  sendToken(res, user, 201, "User Created Successfully");
};

// LOG-IN
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Username or Password", 404));
    }

    const isMatchPassword = await compare(password, user.password);
    if (!isMatchPassword) {
      return next(new ErrorHandler("Invalid Username or Password", 404));
    }

    sendToken(res, user, 200, `Welcome Back ${user.name}`);
  } catch (err) {
    next(err);
  }
};

// LOG-OUT
const logout = async (req, res) => {
  return res
    .status(200)
    .cookie("uid", "", { ...cookieOptions, maxAge: 0 })
    .json({ success: true, message: "Logged Out Successfully" });
};

// Search - User
const searchUser = async (req, res) => {
  try {
    const { name } = req.query;

    return res.status(200).json({ success: true, message: name });
  } catch (error) {
    // next(error);
    cosonsole.log(error);
  }
};

const getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return next(
        new ErrorHandler("Sorry Amish but unfortunately we lost your Data", 404)
      );
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  return res
    .status(200)
    .json({ success: true, message: "User Deleted Successfully" });
};

module.exports = {
  newUser,
  login,
  logout,
  searchUser,
  getMyProfile,
  deleteUser,
};
