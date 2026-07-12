const express = require("express");
const { connectDb } = require("./config/db.js");
const cors = require("cors");
const { authMiddleware } = require("./middleware/authMiddleware.js");
const { healthRouter } = require("./routes/healthRouter.js");
const { authRoutes } = require("./routes/authRoutes.js");
const { protectedRoutes } = require("./routes/protectedRoutes.js");

require("dotenv").config();

//Initialize Express app
const app = express();

const PORT = process.env.PORT;

//Connect to Database
connectDb();

//Middleware to read JSON from requests
app.use(express.json());

//CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

//Health Route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend connected" });
});
// app.use("/api/health", healthRouter());

//Public Routes
app.use("/api/auth", authRoutes());

//Protected Routes
app.use("/api/protected", protectedRoutes());

//Test Route
app.get("/", (req, res) => {
  res.send("Final Project is running");
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
