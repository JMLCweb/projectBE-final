const jwtService = require("../services/jwtService");

function isAuthenticated(req, res, next) {
  const token = req.headers["token"];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const userData = jwtService.verifyToken(token);

    req.user = userData;
    req.headers["role"] = userData.role;
    req.headers["id"] = userData.id;

    next();
  } catch (error) {
    console.error("Token verification failed:", error);

    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = {
  isAuthenticated,
};
