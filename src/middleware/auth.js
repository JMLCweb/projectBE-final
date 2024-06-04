const jwtService = require("../services/jwtService");
const { getAdminById } = require("../db/adminDB");

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

    req.user = userData;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const admin = await getAdminById(req.user.userId);
    if (admin && admin.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Forbidden: Admins only" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  isAuthenticated,
  isAdmin,
};
