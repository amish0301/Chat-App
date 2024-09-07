const express = require("express");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./utils/connection");
const { errorHandler } = require("./middlewares/error");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { userSocketIDs } = require("./constants/data");
const {
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  START_TYPING,
  STOP_TYPING,
  DELETE_MESSAGE,
} = require("./constants/events");
const { getSockets } = require("./lib/helper");
const Message = require("./models/message");
const cloudinary = require("cloudinary").v2;
const { socketAuthenticater } = require("./middlewares/auth");
const { v4: uuid } = require("uuid");

require("dotenv").config({ path: "./.env" });

const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const adminRoutes = require("./routes/admin");
const path = require("path");

// Initialisations
const mongouri = process.env.MONGODB_URL;
const port = process.env.SERVER_PORT || 4000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const clientUri = process.env.CLIENT_URI;
const corsOptions = {
  origin: clientUri,
  credentials: true,
  optionsSuccessStatus: 200,
};

connectMongoDB(mongouri);
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

// assigning io to use across app
app.set("io", io);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "build")));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Middleware for Socket
io.use((socket, next) => {
  cookieParser()(
    socket.request,
    socket.request.res,
    async (err) => await socketAuthenticater({ err: err || null, socket, next })
  );
});

// Socket-io
io.on("connection", (socket) => {
  // console.log("User Connected", socket.id);
  const user = socket.user;

  // when user connect map user_id with socket_id
  userSocketIDs.set(user?._id.toString(), socket.id);

  // When new message will be send in chat, below listener will be triggered
  // Storing message in DB
  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForDB = {
      content: message,
      sender: user?._id,
      chat: chatId,
    };

    try {
      const savedMessage = await Message.create(messageForDB);

      const messageForRealtime = {
        content: savedMessage.content,
        _id: savedMessage._id,
        sender: {
          _id: savedMessage.sender,
          name: user?.name,
        },
        chat: chatId,
        createdAt: savedMessage.createdAt,
      };

      // Sockets of all members in a Particular Chat
      const membersSocket = getSockets(members);

      // Notifying all members associated with chatId to client side
      io.to(membersSocket).emit(NEW_MESSAGE, {
        chatId,
        message: messageForRealtime,
      });

      // When new message is sent, alert all members associated with chatId
      io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });
    } catch (error) {
      console.log("Error saving  message:", error);
      throw new Error(error);
    }
  });

  socket.on(START_TYPING, ({ chatId, members }) => {
    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(START_TYPING, { chatId });
  });

  socket.on(STOP_TYPING, ({ chatId, members }) => {
    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(STOP_TYPING, { chatId });
  });

  socket.on("disconnect", () => {
    // console.log("User Disconnected", socket.id);
    userSocketIDs.delete(user._id.toString());
  });
});

app.use(errorHandler); // Middleware for errors

// default Home Route
app.get("/", (req, res) => {
  res.send("Home Page");
});

server.listen(port, () =>
  console.log(`Server running on ${port} in ${envMode} mode`)
);
