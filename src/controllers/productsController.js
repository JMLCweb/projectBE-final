const productDB = require("../db/productsDB");
const { ObjectId } = require("mongodb");

const getProducts = async (req, res) => {
  try {
    const products = await productDB.getProducts();
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
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid product ID",
    });
  }

  try {
    const product = await productDB.getProductById(id);
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

const postProduct = async (req, res) => {
  const newProduct = req.body;
  // You can add validation for newProduct here

  try {
    const product = await productDB.addProduct(newProduct);
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

const putProductById = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  // You can add validation for updatedProduct here

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid product ID",
    });
  }

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
  getProducts,
  getProductById,
  postProduct,
  putProductById,
  deleteProductById,
};
