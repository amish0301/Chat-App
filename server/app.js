const express = require("express");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./utils/connection");
const { errorHandler } = require("./middlewares/error");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { userSocketIDs } = require("./constants/data");
const { NEW_MESSAGE, NEW_MESSAGE_ALERT } = require("./constants/events");
const { getSockets } = require("./lib/helper");
const { Message } = require("./models/message");
const cloudinary = require("cloudinary").v2;
const { socketAuthenticater } = require("./middlewares/auth");
require("dotenv").config({ path: "./.env" });

const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const adminRoutes = require("./routes/admin");

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

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);

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
  console.log("User Connected", socket.id);
  const user = socket.user;

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

app.use(errorHandler); // Middleware for errors

// default Home Route
app.get("/", (req, res) => {
  res.send("Home Page");
});

server.listen(port, () =>
  console.log(`Server running on ${port} in ${envMode} mode`)
);
