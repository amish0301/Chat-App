const { TryCatch, ErrorHandler } = require("../utils/ErrorHandler");
const { Chat } = require("../models/chat");
const { getOtherMember } = require("../lib/helper");
const { emitEvent } = require("../utils/feature");
const { ALERT, REFETCH_CHAT } = require("../constants/events");

const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;

  if (members.length < 2) {
    return next(new ErrorHandler("Minimum 2 members are required", 400));
  }

  const allMembers = [...members, req.userId]; // add yourself into group
  await Chat.create({
    name,
    groupChat: true,
    creator: req.userId,
    members: allMembers,
  });

  emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
  emitEvent(req, REFETCH_CHAT, members);

  return res.status(201).json({
    success: true,
    message: "Group Created",
  });
});

const getMyChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({
    members: req.userId,
  }).populate("members", "name avatar");

  // return res.status(200).json({ success: true, chats });

  // we can also use aggregation pipeline here
  const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
    const otherMember = getOtherMember(members, req.userId);
    return {
      _id,
      groupChat,
      avatar: groupChat
        ? members.slice(0, 3).map(({ avatar }) => avatar?.url)
        : [otherMember?.avatar?.url],
      name: groupChat ? name : otherMember?.name,
      members: members.reduce((prev, curr) => {
        if (curr._id.toString() !== req.userId.toString()) {
          prev.push(curr._id);
        }
        return prev;
      }, []),
    };
  });
  return res.status(200).json({ success: true, transformedChats });
});

const getMyGroups = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({
    members: req.userId,
    groupChat: true,
    creator: req.userId,
  }).populate("members", "name avatar");

  const groups = chats.map(({ _id, name, members, groupChat }) => {
    return {
      _id,
      groupChat,
      name,
      avatar: members.slice(0, 3).map(({ avatar }) => avatar?.url),
    };
  });

  return res.status(200).json({ success: true, groups });
});

module.exports = { newGroupChat, getMyChats, getMyGroups };
