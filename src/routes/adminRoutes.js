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
const checkRole = require("../middleware/role");
const router = express.Router();

router.post("/register", createAdmin);
router.post("/login", loginAdmin);

router.use(auth.isAuthenticated);

router.get("/", checkRole("admin"), fetchAllAdmins);
router.get("/:id", checkRole("admin"), fetchAdminById);
router.put("/update/:id", checkRole("admin"), modifyAdminById);
router.delete("/delete/:id", checkRole("admin"), removeAdminById);

module.exports = router;
