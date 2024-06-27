const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/role");
const verifyId = require("../middleware/verifyId");

const router = express.Router();

router.post("/login", userController.loginUser);

router.use(auth.isAuthenticated);
router.get("/", checkRole("admin"), userController.fetchAllUsers);
router.post("/register", checkRole("admin"), userController.createUser);

router.get("/:userId", verifyId.IdentifyUser, userController.fetchUserById);

router.put(
  "/update/:userId",
  verifyId.IdentifyUser,
  userController.modifyUserWithVerification
);

router.put(
  "/update/admin/:userId",
  checkRole("admin"),
  userController.modifyUserById
);
router.delete("/delete/:id", checkRole("admin"), userController.removeUserById);

module.exports = router;
