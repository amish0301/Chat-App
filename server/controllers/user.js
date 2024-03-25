const { User } = require("../models/user");
const { sendToken } = require("../utils/JWT");
const { compare } = require("bcrypt");
const { cookieOptions } = require("../constants/cookie");
const { ErrorHandler, TryCatch } = require("../utils/ErrorHandler");
const { Chat } = require("../models/chat");

// SIGN-UP
const newUser = TryCatch(async (req, res, next) => {
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
});

// LOG-IN
const login = TryCatch(async (req, res, next) => {
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
});

// LOG-OUT
const logout = async (req, res) => {
  return res
    .status(200)
    .cookie("uid", "", { ...cookieOptions, maxAge: 0 })
    .json({ success: true, message: "Logged Out Successfully" });
};

// Search  User
const searchUser = TryCatch(async (req, res, next) => {
  const { name = "" } = req.query;

  // finding all my chats
  const myChats = await Chat.find({
    groupChat: false,
    members: { $in: [req.userId] },
  });

  // extracting all users from my chats
  const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);

  // finding all users except my chats
  const allUsersExceptMyChats = await User.find({
    _id: { $nin: allUsersFromMyChats },
    name: { $regex: name, $options: "i" },
  });

  const users = allUsersExceptMyChats.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar?.url,
  }));

  return res.status(200).json({ success: true, users });
});

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  return res
    .status(200)
    .json({ success: true, message: "User Deleted Successfully" });
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

module.exports = {
  newUser,
  login,
  logout,
  searchUser,
  getMyProfile,
  deleteUser,
};
