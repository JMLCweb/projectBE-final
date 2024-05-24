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

router.get("/", fetchAllUsers);
router.get("/:id", fetchUserById);
router.put("/update/:id", modifyUserById);
router.delete("/delete/:id", removeUserById);

router.post("/login", loginUser);
router.post("/register", createUser);

module.exports = router;
