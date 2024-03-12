const { User } = require("../models/user");
const { sendToken } = require("../utils/JWT");
const { compare } = require("bcrypt");

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
      return next(new Error("User Not Exist"));
    }

    const isMatchPassword = await compare(password, user.password);
    if (!isMatchPassword) {
      return next(new Error("Password is Invalid"));
    }

    sendToken(res, user, 200, `Welcome Back ${user.name}`);
  } catch (err) {
    next(err);
  }
};

const getMyProfile = async (req, res) => {
  const user = await User.findOne({ username: "amish0301" });

  if (!user) {
    return res
      .status(401)
      .json({ error: "Sorry Amish Your data has lost Unfortunately!!" });
  }

  return res.status(200).json({ success: true, user });
};

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  return res
    .status(200)
    .json({ success: true, message: "User Deleted Successfully" });
};

module.exports = {
  newUser,
  deleteUser,
  login,
  getMyProfile,
};
