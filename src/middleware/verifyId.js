function IdentifyUser(req, res, next) {
  const userId = req.params.userId;

  if (req.user.role === "admin") {
    return next();
  }

  if (req.user.id !== userId) {
    // Ensure req.user.id is used for comparison
    return res.status(403).json({ message: "Forbidden: Access is denied" });
  }

  next();
}

module.exports = {
  IdentifyUser,
};
