const mongoose = require("mongoose");
const TaskCounter = require("./TaskCounter.js");

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User ID is required"],
    ref: "User",
  },
  taskId: {
    type: Number,
    unique: true,
  },
  title: {
    type: String,
    reqired: true,
  },
  description: {
    type: String,
    required: false,
  },
  completionStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Auto-increment taskId
taskSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await TaskCounter.findOneAndUpdate(
        { _id: "taskId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true },
      );
      this.taskId = counter.seq;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model("Task", taskSchema);
