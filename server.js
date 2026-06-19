const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT;

//Middleware to read JSON from requests
app.use(express.json());

//Test Route
app.get("/", (req, res) => {
  res.send("Lab 6 Project is running");
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
