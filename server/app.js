const express = require('express');
const userRoutes = require('./routes/user');
const { connectMongoDB } = require('./utils/connection');
const {errorHandler} = require('./middlewares/errorHandler');
require('dotenv').config({path: './.env'});

// Initialisations
const mongouri = process.env.MONGODB_URL;
const port = process.env.SERVER_PORT || 3000;

connectMongoDB(mongouri);
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/user', userRoutes);

app.use(errorHandler);      // Middleware to handle errors
// default Home Route
app.get('/', (req, res) => {
    res.send('Home Page');
})

app.listen(port, () => console.log(`Server running on ${port}`));