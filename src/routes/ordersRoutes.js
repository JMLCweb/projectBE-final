const express = require("express");
const {
  fetchAllOrders,
  fetchOrderById,
  newOrderStatus,
  checkoutCart,
} = require("../controllers/ordersController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/role");
const verifyId = require("../middleware/verifyId");

const router = express.Router();

router.use(auth.isAuthenticated);
router.post("/checkout/:userId", verifyId.IdentifyUser, checkoutCart);

router.use(checkRole("admin"));

router.get("/", fetchAllOrders);
router.get("/:orderId", fetchOrderById);
router.put("/update/:orderId", newOrderStatus);

module.exports = router;
