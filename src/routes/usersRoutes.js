const express = require("express");
const {
  fetchAllUsers,
  fetchUserById,
  createUser,
  modifyUserById,
  removeUserById,
  loginUser,
  modifyUserWithVerification,
} = require("../controllers/userController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/role");
const verifyId = require("../middleware/verifyId");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);

router.use(auth.isAuthenticated);
router.get("/", checkRole("admin"), fetchAllUsers);

router.get("/:userId", verifyId.IdentifyUser, fetchUserById);

router.put(
  "/update/:userId",
  verifyId.IdentifyUser,
  modifyUserWithVerification
);

router.put("/update/admin/:userId", checkRole("admin"), modifyUserById);
router.delete("/delete/:id", checkRole("admin"), removeUserById);

module.exports = router;
