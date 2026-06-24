const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  //Look for Authorization header
  if (!authHeader) {
    return res.status(401).json({ message: "Missing Authorization header" });
  }

  //Check if it starts with Bearer
  if (!authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization Header does not start with Bearer" });
  }

  //Extract token
  const sessionToken = authHeader.split(" ")[1];

  try {
    //Verify token
    const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET);

    //Attach user info to request
    req.user = decoded;

    //Allow request to continue
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = { authMiddleware };
