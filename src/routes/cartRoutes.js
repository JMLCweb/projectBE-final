const express = require("express");
const {
  addProductToCart,
  removeProductFromCart,
  fetchCart,
  emptyCart,
} = require("../controllers/cartController");
const auth = require("../middleware/auth");
const verifyId = require("../middleware/verifyId");

const router = express.Router();

router.use(auth.isAuthenticated);

router.post("/add/:userId", verifyId.IdentifyUser, addProductToCart);
router.get("/:userId", verifyId.IdentifyUser, fetchCart); // Verificação de ID necessária
router.delete("/remove", removeProductFromCart);
router.post("/clear/:userId", verifyId.IdentifyUser, emptyCart);

module.exports = router;
