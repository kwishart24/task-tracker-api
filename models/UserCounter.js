const mongoose = require("mongoose");

const userCounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const UserCounter = mongoose.model("UserCounter", userCounterSchema);
