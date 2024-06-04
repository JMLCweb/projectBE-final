const express = require("express");
const {
  fetchAllAdmins,
  loginAdmin,
  fetchAdminById,
  createAdmin,
  modifyAdminById,
  removeAdminById,
} = require("../controllers/adminController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", createAdmin);
router.post("/login", loginAdmin);

router.use(auth.isAuthenticated);
router.use(auth.isAdmin);

router.get("/", fetchAllAdmins);
router.get("/:id", fetchAdminById);
router.put("/update/:id", modifyAdminById);
router.delete("/delete/:id", removeAdminById);

module.exports = router;
