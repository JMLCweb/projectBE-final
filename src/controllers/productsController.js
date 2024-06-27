const productDB = require('../db/productsDB');
const { ObjectId } = require('mongodb');

const newProduct = async (req, res) => {
  const productData = req.body;

  try {
    const product = await productDB.addProduct(productData);
    res.status(201).json({
      status: 'OK',
      data: product,
    });
  } catch (error) {
    console.error('Error in postProduct:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error adding product',
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productDB.getAllProducts();
    res.status(200).json({
      status: 'OK',
      data: products,
    });
  } catch (error) {
    console.error('Error in getProducts:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error getting products',
    });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productDB.getProduct(id);
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found',
      });
    }

    res.status(200).json({
      status: 'OK',
      data: product,
    });
  } catch (error) {
    console.error('Error in getProductById:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error getting product',
    });
  }
};

const putProductById = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  try {
    const updated = await productDB.updateProductById(id, updatedProduct);
    if (!updated) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found',
      });
    }

    res.status(200).json({
      status: 'OK',
      message: 'Product updated successfully',
    });
  } catch (error) {
    console.error('Error in putProductById:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error updating product',
    });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid product ID',
    });
  }

  try {
    const deleted = await productDB.deleteProductById(id);
    if (!deleted) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found',
      });
    }

    res.status(200).json({
      status: 'OK',
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error in deleteProductById:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting product',
    });
  }
};

const addProductReview = async (req, res) => {
  const { userId } = req.params;
  const { productId, rating, comment } = req.body;

  try {
    const review = await productDB.addReview(
      productId,
      userId,
      rating,
      comment
    );

    res.json({ message: 'Review added successfully', review });
  } catch (error) {
    console.error('Error in addProductReview:', error);
    if (error.message === 'Product not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const editProductReview = async (req, res) => {
  const { userId } = req.params;
  const { rating, comment, productId, reviewId } = req.body;

  try {
    const result = await productDB.editReview(
      productId,
      reviewId,
      userId,
      rating,
      comment
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: 'Review not found or user not authorized' });
    }

    res.json({ message: 'Review edited successfully' });
  } catch (error) {
    console.error('Error in editProductReview:', error);
    res.status(500).json({ message: error.message });
  }
};

const removeProductReview = async (req, res) => {
  const { reviewId, productId } = req.body;

  try {
    const result = await productDB.removeReview(productId, reviewId);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ message: 'Review removed successfully' });
  } catch (error) {
    console.error('Error in removeProductReview:', error);
    res.status(500).json({ message: error.message });
  }
};

const addProductToFavorites = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const item = await productDB.addToFavorites(userId, productId);
    if (!item) {
      return res.status(409).json({ message: 'Product already in favorites' });
    }

    res.json({ message: 'Product added to favorites' });
  } catch (error) {
    console.error('Error in addProductToFavorites:', error);
    res.status(500).json({ message: 'Error adding product to favorites' });
  }
};

const removeProductFromFavorites = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const removed = await productDB.removeFromFavorites(userId, productId);
    if (!removed) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Product removed from favorites' });
  } catch (error) {
    console.error('Error in removeProductFromFavorites:', error);
    res.status(500).json({ message: 'Error removing product from favorites' });
  }
};

module.exports = {
  newProduct,
  getProducts,
  getProductById,
  addProductReview,
  editProductReview,
  removeProductReview,
  putProductById,
  deleteProductById,
  addProductToFavorites,
  removeProductFromFavorites,
};
