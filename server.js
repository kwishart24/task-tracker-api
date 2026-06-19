const express = require("express");
const { connectDb } = require("./config/db");
const { healthRouter } = require("./routes/healthRouter");
const { authRoutes } = require("./routes/authRoutes");

require("dotenv").config();

//Initialize Express app
const app = express();

const PORT = process.env.PORT;

//Connect to Database
connectDb();

//Middleware to read JSON from requests
app.use(express.json());

//Health Route
app.use("/api/health", healthRouter());

//Public Routes
app.use("/api/auth", authRoutes());

//Test Route
app.get("/", (req, res) => {
  res.send("Lab 6 Project is running");
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
