function checkRole(requiredRole) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ message: "Forbidden: Access is denied" });
    }
    next();
  };
}

module.exports = checkRole;
