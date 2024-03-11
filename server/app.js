const express = require('express');
const userRoutes = require('./routes/user');
const { connectMongoDB } = require('./utils/connection');
require('dotenv').config();

// Initialisations
const mongouri = process.env.MONGODB_URL;
const port = process.env.SERVER_PORT;

connectMongoDB(mongouri);
const app = express();
app.use(express.json());



// default Home Route
app.get('/', (req, res) => {
    res.send('Home Page');
})

// ******* Routes **********
app.use('/user', userRoutes);

app.listen(port, () => console.log(`Server running on ${port}`));