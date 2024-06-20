const { ObjectId } = require("mongodb");
const connectToDB = require("./connectDB");

const addProduct = async (product) => {
  const db = await connectToDB();
  const productsCollection = db.collection("products");
  const timestamp = new Date();
  const productWithDate = {
    ...product,
    createdAt: timestamp,
  };
  const result = await productsCollection.insertOne(productWithDate);
  return { id: result.insertedId, ...productWithDate };
};

const getAllProducts = async () => {
  const db = await connectToDB();
  const productsCollection = db.collection("products");
  return await productsCollection.find().toArray();
};

const getProduct = async (id) => {
  const db = await connectToDB();
  const productsCollection = db.collection("products");
  return await productsCollection.findOne({
    _id: ObjectId.createFromHexString(id),
  });
};

const updateProductById = async (id, product) => {
  const db = await connectToDB();
  const productsCollection = db.collection("products");
  const result = await productsCollection.updateOne(
    { _id: ObjectId.createFromHexString(id) },
    { $set: { ...product, updatedAt: new Date() } }
  );
  return result.matchedCount > 0;
};

const addReview = async (productId, userId, rating, comment) => {
  const db = await connectToDB();
  const productsCollection = db.collection("products");

  const review = {
    userId: new ObjectId(userId),
    rating,
    comment,
    date: new Date(),
  };

  const result = await productsCollection.updateOne(
    { _id: new ObjectId(productId) },
    { $push: { reviews: review } }
  );

  if (result.matchedCount === 0) {
    throw new Error("Product not found");
  }

  return review;
};

const deleteProductById = async (id) => {
  const db = await connectToDB();
  const productsCollection = db.collection("products");
  const result = await productsCollection.deleteOne({
    _id: ObjectId.createFromHexString(id),
  });
  return result.deletedCount > 0;
};

module.exports = {
  addProduct,
  getAllProducts,
  getProduct,
  updateProductById,
  addReview,
  deleteProductById,
};
