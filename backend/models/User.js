const mongoose = require("mongoose");
const UserCounter = require("./UserCounter.js");

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    reqired: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-increment userId
userSchema.pre("save", async function () {
  if (this.isNew) {
    const counter = await UserCounter.findOneAndUpdate(
      { _id: "userId" },
      { $inc: { seq: 1 } },
      { returnDocument: "after", upsert: true },
    );

    this.userId = counter.seq;
  }
});

module.exports = mongoose.model("User", userSchema);
