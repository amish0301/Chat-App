const express = require("express");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./utils/connection");
const { errorHandler } = require("./middlewares/error");
// const { createMessagesInChat } = require("./Fake_Data/chat");
require("dotenv").config({ path: "./.env" });

const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");

// Initialisations
const mongouri = process.env.MONGODB_URL;
const port = process.env.SERVER_PORT || 4000;

connectMongoDB(mongouri);
// createMessagesInChat("66014e5bfc199f8316dce54c", 5);
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);

app.use(errorHandler); // Middleware to handle errors
// default Home Route
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(port, () => console.log(`Server running on ${port}`));
