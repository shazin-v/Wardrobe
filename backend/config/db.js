const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to mongoDB");
  } catch (error) {
    console.log("error connection", error);
  }
}

module.exports = connectDB;
