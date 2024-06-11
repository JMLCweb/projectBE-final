const express = require("express");
const {
  fetchAllUsers,
  fetchUserById,
  createUser,
  modifyUserById,
  removeUserById,
  loginUser,
} = require("../controllers/userController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/role");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", createUser);

router.use(auth.isAuthenticated);

router.put("/update/:id", modifyUserById);

router.get("/:id", checkRole("admin"), fetchUserById);
router.get("/", checkRole("admin"), fetchAllUsers);
router.delete("/delete/:id", checkRole("admin"), removeUserById);

module.exports = router;
