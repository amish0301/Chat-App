const { TryCatch, ErrorHandler } = require("../utils/ErrorHandler");
const { Chat } = require("../models/chat");
const { User } = require("../models/user");
const { getOtherMember } = require("../lib/helper");
const { emitEvent } = require("../utils/feature");
const { ALERT, REFETCH_CHAT } = require("../constants/events");

const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;

  if (members.length < 2) {
    return next(new ErrorHandler("Minimum 2 members are required", 400));
  }

  const allMembers = [...members.filter((member) => member !== req.userId), req.userId]; // add yourself into group
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

const addMembers = TryCatch(async (req, res, next) => {
  const { chatId, members } = req.body;
  const chat = await Chat.findById(chatId);

  // Validations
  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("Only group chat can have members", 400));
  if (!members || members.length < 1) return next(new ErrorHandler("Please Provide Members", 400));

  // if user is tries to add members in a group, where he/she is not creator of the group then they can't add members
  if (chat.creator.toString() !== req.userId.toString()) {
    return next(new ErrorHandler("You are not authorized to add members", 403));
  }

  const allNewMembersPromise = members.map((member) =>
    User.findById(member)
  );

  const allNewMembers = await Promise.all(allNewMembersPromise);

  // unique members validation
  const uniqueMembers = allNewMembers.filter((member) => !chat.members.includes(member._id));
  chat.members.push(...uniqueMembers.map((member) => member._id));

  if (chat.members.length > 100) {
    return next(new ErrorHandler("Can't add more than 100 members", 400));
  }

  await chat.save();
  const allUserName = allNewMembers.map(({ name }) => name).join(",");

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${allUserName} you have been added in this group`
  );
  emitEvent(req, REFETCH_CHAT, chat.members);

  return res.status(200).json({ success: true, message: `Members are Added in ${chat.name}` });
});

module.exports = { newGroupChat, getMyChats, getMyGroups, addMembers };