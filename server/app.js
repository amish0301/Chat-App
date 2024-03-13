const express = require("express");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./utils/connection");
const { errorHandler } = require("./middlewares/error");
// const {createUser} = require("./Fake_Data/user");
require("dotenv").config({ path: "./.env" });

const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");

// Initialisations
const mongouri = process.env.MONGODB_URL;
const port = process.env.SERVER_PORT || 3000;

connectMongoDB(mongouri);
// createUser(10);
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
