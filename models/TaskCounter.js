const mongoose = require("mongoose");

const taskCounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const TaskCounter = mongoose.model("TaskCounter", taskCounterSchema);
