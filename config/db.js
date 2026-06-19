const mongoose = require("mongoose");

require("dotenv").config();

async function connectDb() {
  const uri = process.env.MONGO_URI;

  try {
    await mongoose.connect(uri);

    console.log("Mongoose connected!");

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB error:", err);
    });
  } catch (error) {
    console.error("Database connection error: ", error.message);
  }
}

module.exports = { connectDb };
