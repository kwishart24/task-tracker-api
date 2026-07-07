const express = require("express");
const { connectDb } = require("./backend/config/db");
const { authMiddleware } = require("./backend/middleware/authMiddleware.js");
const { healthRouter } = require("./backend/routes/healthRouter");
const { authRoutes } = require("./backend/routes/authRoutes");
const { protectedRoutes } = require("./backend/routes/protectedRoutes.js");

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

//Protected Routes
app.use("/api/protected", protectedRoutes());

//Test Route
app.get("/", (req, res) => {
  res.send("Lab 6 Project is running");
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
