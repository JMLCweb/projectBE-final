function checkRole(requiredRole) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ message: "Forbidden: No user data found" });
    }
    if (req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: `Forbidden: Requires role ${requiredRole}` });
    }
    next();
  };
}

module.exports = checkRole;
