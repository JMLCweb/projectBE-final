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

router.get("/", auth, fetchAllUsers);
router.get("/:id", auth, fetchUserById);
router.put("/update/:id", auth, modifyUserById);
router.delete("/delete/:id", auth, removeUserById);

router.post("/login", loginUser);
router.post("/register", createUser);

module.exports = router;
