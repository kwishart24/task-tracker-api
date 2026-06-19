const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function authRoutes() {
  const router = Router();

  //In-memory store
  global.users = global.users || [];

  //*************************REGISTRATION***********************/
  router.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    //check if user already exists
    const storedUser = global.users.find((u) => u.email === email);

    if (storedUser) {
      return res
        .status(400)
        .json({ message: "Email has already been registered, please login" });
    }

    //Hash password
  });

  return router;
}

module.exports = { authRoutes };
