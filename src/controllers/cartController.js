const cartDB = require('../db/cartDB');

const fetchCart = async (req, res) => {
  try {
    const cart = await cartDB.getCart(req.params.userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error getting Cart' });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const updatedCart = await cartDB.addToCart(
      req.params.userId,
      productId,
      quantity
    );
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding Product' });
  }
};

const updateCartItems = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const updatedCart = await cartDB.updateCart(
      req.params.userId,
      productId,
      quantity
    );
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Update Failed' });
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const { userId } = req.params;
    const updatedCart = await cartDB.removeFromCart(userId, productId);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Delete Failed' });
  }
};

const emptyCart = async (req, res) => {
  try {
    const updatedCart = await cartDB.clearCart(req.params.userId);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Empty Cart Failed' });
  }
};

module.exports = {
  addProductToCart,
  removeProductFromCart,
  fetchCart,
  emptyCart,
  updateCartItems,
};
