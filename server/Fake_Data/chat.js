const { Chat } = require("../models/chat");
const { Message } = require("../models/message");
const { User } = require("../models/user");
const { faker, simpleFaker } = require("@faker-js/faker");

const createSingleChats = async (chatCounts) => {
  try {
    const users = await User.find({}).select("_id");
    const chatPromise = [];

    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        chatPromise.push(
          Chat.create({
            name: faker.lorem.words(2),
            members: [users[i], users[j]],
          })
        );
      }
    }

    await Promise.all(chatPromise);
    console.log("chat Created");
    process.exit();
  } catch (error) {
    connsole.log(error);
    process.exit(1);
  }
};

const createGroupChats = async (chatCounts) => {
  try {
    const users = await User.find({}).select("_id");
    const chatPromise = [];

    for (let i = 0; i < chatCounts; i++) {
      const numMembers = simpleFaker.number.int({ min: 2, max: users.length });
      const members = [];

      for (let i = 0; i < numMembers; i++) {
        const randomIdx = Math.floor(Math.random() * users.length);
        const randomUser = users[randomIdx];

        if (!members.includes(randomUser)) members.push(randomUser);
      }

      const chat = Chat.create({
        groupChat: true,
        name: faker.lorem.words(1),
        members: members,
        creator: members[0],
      });
      chatPromise.push(chat);
    }

    await Promise.all(chatPromise);
    console.log("Group Chat Created");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const createMessages = async (messageCnt) => {
  try {
    const users = await User.find({}).select("_id");
    const chats = await Chat.find({}).select("_id");

    const messagePromise = [];

    for (let i = 0; i < messageCnt; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomChat = chats[Math.floor(Math.random() * chats.length)];

      messagePromise.push(
        Message.create({
          chat: randomChat,
          sender: randomUser,
          content: faker.lorem.sentence(),
        })
      );
    }

    await Promise.all(messagePromise);
    console.log("message Created");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const createMessagesInChat = async (chatId, messageCnt) => {
  try {
    const users = await User.find().select("_id");

    const messagePromise = [];
    for (let i = 0; i < messageCnt; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];

      messagePromise.push(
        Message.create({
          chat: chatId,
          sender: randomUser,
          content: faker.lorem.sentence(),
        })
      );
    }
    await Promise.all(messagePromise);
    console.log("message Created");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = {
  createSingleChats,
  createGroupChats,
  createMessages,
  createMessagesInChat,
};
