const { TryCatch, ErrorHandler } = require("../utils/ErrorHandler");
const { Chat } = require("../models/chat");
const { emitEvent } = require("../utils/feature");
const { ALERT, REFETCH_CHAT } = require("../constants/events");

const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;

  if (members.length < 2) {
    return next(new ErrorHandler("Minimum 2 members are required", 400));
  }

  const allMembers = [...members, req.user];
  await Chat.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
  });

  emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
  emitEvent(req, REFETCH_CHAT, members);

  return res.status(201).json({
    success: true,
    message: "Group Created",
  });
});

module.exports = { newGroupChat };
