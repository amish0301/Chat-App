const express = require("express");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./utils/connection");
const { errorHandler } = require("./middlewares/error");
require("dotenv").config({ path: "./.env" });

const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const adminRoutes = require("./routes/admin");

// Initialisations
const mongouri = process.env.MONGODB_URL;
const port = process.env.SERVER_PORT || 4000;

connectMongoDB(mongouri);
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);

app.use(errorHandler); // Middleware to handle errors
// default Home Route
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(port, () => console.log(`Server running on ${port}`));
