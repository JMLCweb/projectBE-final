const productDB = require("../db/productsDB");
const { ObjectId } = require("mongodb");

const newProduct = async (req, res) => {
  const productData = req.body;

  try {
    const product = await productDB.addProduct(productData);
    res.status(201).json({
      status: "OK",
      data: product,
    });
  } catch (error) {
    console.error("Error in postProduct:", error);
    res.status(500).json({
      status: "error",
      message: "Error adding product",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productDB.getAllProducts();
    res.status(200).json({
      status: "OK",
      data: products,
    });
  } catch (error) {
    console.error("Error in getProducts:", error);
    res.status(500).json({
      status: "error",
      message: "Error getting products",
    });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productDB.getProduct(id);
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "OK",
      data: product,
    });
  } catch (error) {
    console.error("Error in getProductById:", error);
    res.status(500).json({
      status: "error",
      message: "Error getting product",
    });
  }
};
const addProductReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const { rating, comment } = req.body;

    const review = await addReview(
      req.params.productId,
      userId,
      rating,
      comment
    );

    res.json({ message: "Review added successfully", review });
  } catch (error) {
    if (error.message === "Product not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const putProductById = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  try {
    const updated = await productDB.updateProductById(id, updatedProduct);
    if (!updated) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error in putProductById:", error);
    res.status(500).json({
      status: "error",
      message: "Error updating product",
    });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid product ID",
    });
  }

  try {
    const deleted = await productDB.deleteProductById(id);
    if (!deleted) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteProductById:", error);
    res.status(500).json({
      status: "error",
      message: "Error deleting product",
    });
  }
};

module.exports = {
  newProduct,
  getProducts,
  getProductById,
  addProductReview,
  putProductById,
  deleteProductById,
};
