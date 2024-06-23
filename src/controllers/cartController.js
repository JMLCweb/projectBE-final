const {
  addToCart,
  removeFromCart,
  getCart,
  clearCart,
  updateCart,
} = require("../db/cartDB");

const fetchCart = async (req, res) => {
  try {
    const cart = await getCart(req.params.userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const updatedCart = await addToCart(req.params.userId, productId, quantity);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCartItems = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const updatedCart = await updateCart(
      req.params.userId,
      productId,
      quantity
    );
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const { userId } = req.params;
    const updatedCart = await removeFromCart(userId, productId);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const emptyCart = async (req, res) => {
  try {
    const updatedCart = await clearCart(req.params.userId);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addProductToCart,
  removeProductFromCart,
  fetchCart,
  emptyCart,
  updateCartItems,
};
