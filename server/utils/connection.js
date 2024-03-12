const mongoose = require("mongoose");

const connectMongoDB = async (uri) => {
  await mongoose
    .connect(uri)
    .then(() => {
      console.log('mongoDB connected successfully');
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = { connectMongoDB };
