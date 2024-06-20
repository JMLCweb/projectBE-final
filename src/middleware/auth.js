const jwtService = require("../services/jwtService");

function isAuthenticated(req, res, next) {
  const token = req.headers["token"];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const userData = jwtService.verifyToken(token);
    if (!userData) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const now = Math.floor(Date.now() / 1000);
    if (userData.exp < now) {
      return res.status(401).json({ message: "Token has expired" });
    }

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
