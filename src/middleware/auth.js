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

    const tokenExpiration = new Date(userData.tokenExpiration);
    const now = new Date();
    if (now > tokenExpiration) {
      return res.status(401).json({ message: "Token has expired" });
    }

    req.user = userData;
    req.headers["role"] = userData.role;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = {
  isAuthenticated,
};
