const mongoose = require("mongoose");
const UserCounter = require("./UserCounter.js");

const userSchema = new mongoose.Schema({
  user: {
    userId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      reqired: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
});

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await UserCounter.findOneAndUpdate(
        { _id: "userId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true },
      );
      this.userId = counter.seq;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const User = mongoose.model("User", taskSchema);

export default User;
