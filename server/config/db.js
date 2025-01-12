const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOB_URL);
  } catch (error) {
    console.error("error connecting db", error);
  }
}

module.exports = connectDB;
