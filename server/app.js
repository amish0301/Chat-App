const express = require("express");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./utils/connection");
const { errorHandler } = require("./middlewares/error");
const { Server } = require("socket.io");
const { createServer } = require("http");
const { userSocketIDs } = require("./constants/data");
const { NEW_MESSAGE, MEW_MESSAGE_ALERT } = require("./constants/events");
const { getSockets } = require("./lib/helper");
const { Message } = require("./models/message");
require("dotenv").config({ path: "./.env" });

const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const adminRoutes = require("./routes/admin");

// Initialisations
const mongouri = process.env.MONGODB_URL;
const port = process.env.SERVER_PORT || 4000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";

connectMongoDB(mongouri);
const app = express();
const server = createServer(app);
const io = new Server(server, {});

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);

// Middleware for Socket
io.use((socket, next) => {});

// Socket Io
io.on("connection", (socket) => {
  console.log("User Connected", socket.id);
  const user = {
    _id: "tmpId",
    name: "Amish",
  };

  // when user connect i'll map socket id with user id
  userSocketIDs.set(user._id.toString(), socket.id);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealtime = {
      content: message,
      _id: "asdasdsadaddsadas",
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    // Sockets of all members in a Particular Chat
    const membersSocket = getSockets(members);
    io.to([...membersSocket]).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealtime,
    });
    io.to([...membersSocket]).emit("NEW_MESSAGE_ALERT", { chatId });

    await Message.create(messageForDB);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    userSocketIDs.delete(user._id.toString());
  });
});

app.use(errorHandler); // Middleware to errors

// default Home Route
app.get("/", (req, res) => {
  res.send("Home Page");
});

server.listen(port, () =>
  console.log(`Server running on ${port} in ${envMode} mode`)
);
