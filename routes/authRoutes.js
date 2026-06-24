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
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    //Save new user
    const newUser = { name, email, hashedPassword };
    global.users.push(newUser);

    console.log(newUser);

    //Token
    const token = jwt.sign(
      {
        email: newUser.email,
        name: newUser.name,
      },
      process.env.JWT_SECRET,
    );

    return res.status(201).json({
      message: "New user has been registered!",
      user: { name, email },
      token,
    });
  });

  //*************************LOGIN***********************/

  router.post("/login", (req, res) => {
    const { email, password } = req.body;

    //Check if user exists
    const foundUser = global.users.find((u) => u.email === email);

    if (!foundUser) {
      return res.status(400).json({ message: "User not found" });
    }

    //Compare entered password with stored hashed password
    const passwordMatch = bcrypt.compareSync(
      password,
      foundUser.hashedPassword,
    );

    if (!passwordMatch) {
      //Return error message if login failed
      return res
        .status(401)
        .json({ message: "Email or password does not match" });
    }

    const token = jwt.sign(
      { email: foundUser.email, name: foundUser.name },
      process.env.JWT_SECRET,
    );

    //Return JWT token if login successful
    return res.status(200).json({ message: "Login successful", token });
  });

  return router;
}

module.exports = { authRoutes };
