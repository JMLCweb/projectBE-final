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

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", createUser);

router.use(auth.isAuthenticated);
router.use(auth.isAdmin);

router.get("/", fetchAllUsers);
router.get("/:id", fetchUserById);
router.put("/update/:id", modifyUserById);
router.delete("/delete/:id", removeUserById);

module.exports = router;
