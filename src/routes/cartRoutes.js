const express = require("express");
const {
  addProductToCart,
  removeProductFromCart,
  fetchCart,
  emptyCart,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/add", addProductToCart);
router.delete("/remove", removeProductFromCart);
router.get("/:userId", fetchCart);
router.post("/clear/:userId", emptyCart);

module.exports = router;
