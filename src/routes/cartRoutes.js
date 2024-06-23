const express = require("express");
const cartController = require("../controllers/cartController");
const auth = require("../middleware/auth");
const verifyId = require("../middleware/verifyId");

const router = express.Router();

router.use(auth.isAuthenticated);
router.get("/:userId", verifyId.IdentifyUser, cartController.fetchCart);
router.post(
  "/add/:userId",
  verifyId.IdentifyUser,
  cartController.addProductToCart
);
router.delete(
  "/remove/:userId",
  verifyId.IdentifyUser,
  cartController.removeProductFromCart
);
router.post("/clear/:userId", verifyId.IdentifyUser, cartController.emptyCart);

router.put(
  "/update/:userId",
  verifyId.IdentifyUser,
  cartController.updateCartItems
);

module.exports = router;
