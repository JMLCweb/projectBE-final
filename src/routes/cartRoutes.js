const express = require("express");
const {
  addProductToCart,
  removeProductFromCart,
  fetchCart,
  emptyCart,
  checkoutCart,
} = require("../controllers/cartController");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth.isAuthenticated);

router.post("/add", addProductToCart);
router.get("/:userId", fetchCart);
router.delete("/remove", removeProductFromCart);
router.post("/clear/:userId", emptyCart);

module.exports = router;
