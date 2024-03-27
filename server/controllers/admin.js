const { TryCatch } = require("../utils/ErrorHandler");
const { User } = require("../models/user");
const { Chat } = require("../models/chat");

const getUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({});

  const transformedUsers = await Promise.all(
    users.map(async ({ name, username, avatar, _id }) => {
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({ groupChat: true, members: _id }),
        Chat.countDocuments({ groupChat: false, members: _id }),
      ]);

      return {
        name,
        username,
        avatar: avatar?.url,
        _id,
        groups,
        friends,
      };
    })
  );

  return res.status(200).json({
    success: true,
    MaxGroups: maxGroup,
    Name: name,
    Users: transformedUsers,
  });
});

const getChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({})
    .populate("members", "name avatar")
    .populate("creator", "name avatar");

  const transformedChats = await Promise.all(
    chats.map(async ({ name, members, _id, groupChat, creator }) => {
      const totalMessages = await Chat.countDocuments({ chat: _id });
      return {
        _id,
        name,
        groupChat,
        avatar: members.slice(0, 3).map((member) => member.avatar?.url),
        members: members.map(({ _id, name, avatar }) => {
          return {
            _id,
            name,
            avatar: avatar?.url,
          };
        }),
        creator: {
          name: creator?.name || "None",
          avatar: creator?.avatar?.url || "",
        },
        totalMembers: members.length,
        totalMessages,
      };
    })
  );
  
  return res.status(200).json({ success: true, Chats: transformedChats });
});

module.exports = { getUsers, getChats };
