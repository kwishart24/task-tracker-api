const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

function authRoutes() {
  const router = Router();

  //In-memory store
  global.users = global.users || [];

  //*************************REGISTRATION***********************/
  router.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;

      //check if user already exists
      //const storedUser = global.users.find((u) => u.email === email);
      const storedUser = await User.findOne({ email });

      if (storedUser) {
        return res
          .status(400)
          .json({ message: "Email has already been registered, please login" });
      }

      //Hash password
      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(password, salt);

      //Create New User
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      //Save new user
      // const newUser = { name, email, userId, hashedPassword };
      // global.users.push(newUser);

      console.log(newUser);

      //Token
      const token = jwt.sign(
        {
          id: newUser._id,
          email: newUser.email,
          name: newUser.name,
        },
        process.env.JWT_SECRET,
      );

      return res.status(201).json({
        message: "New user has been registered!",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          createdAt: newUser.createdAt,
        },
        token,
      });
    } catch (error) {
      console.error("Registration error:", error);
      return res
        .status(500)
        .json({ message: "Server error during registration" });
    }
  });

  //*************************LOGIN***********************/

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    //Check if user exists
    // const foundUser = global.users.find((u) => u.email === email);

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(400).json({ message: "User not found" });
    }

    //Compare entered password with stored hashed password
    const passwordMatch = bcrypt.compareSync(password, foundUser.password);

    if (!passwordMatch) {
      //Return error message if login failed
      return res
        .status(401)
        .json({ message: "Email or password does not match" });
    }

    const token = jwt.sign(
      {
        id: foundUser._id,
        email: foundUser.email,
        name: foundUser.name,
      },
      process.env.JWT_SECRET,
    );

    //Return JWT token if login successful
    return res
      .status(200)
      .json({ message: "Login successful", foundUser, token });
  });

  //*************************LOGOUT***********************/
  router.post("/logout", (req, res) => {
    return res.status(200).json({ message: "Logoff successful" });
  });

  return router;
}

module.exports = { authRoutes };
