const {
  addToCart,
  removeFromCart,
  getCart,
  clearCart,
} = require("../db/cartDB");

const addProductToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const updatedCart = await addToCart(userId, productId, quantity);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const updatedCart = await removeFromCart(userId, productId);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchCart = async (req, res) => {
  try {
    const cart = await getCart(req.params.userId);
    res.json(cart);
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
};