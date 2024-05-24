const { MongoClient, ObjectId } = require("mongodb");

const mongoUrl = process.env.MONGO_URL;
const client = new MongoClient(mongoUrl);

const connectToDB = async () => {
  try {
    await client.connect();
    const db = client.db("projectDB");
    return db.collection("products");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Failed to connect to the database.");
  }
};

const getProducts = async () => {
  try {
    const productsCollection = await connectToDB();
    return await productsCollection.find().toArray();
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw new Error("Failed to get all products.");
  }
};

const getProductById = async (id) => {
  try {
    const productsCollection = await connectToDB();
    return await productsCollection.findOne({
      _id: ObjectId.createFromHexString(id),
    });
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw new Error("Failed to get product by ID.");
  }
};

const addProduct = async (product) => {
  try {
    const productsCollection = await connectToDB();

    const timestamp = new Date();
    const productWithTimestamps = {
      ...product,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const result = await productsCollection.insertOne(productWithTimestamps);
    return { id: result.insertedId, ...product };
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product.");
  }
};

const updateProductById = async (id, product) => {
  try {
    const productsCollection = await connectToDB();
    const result = await productsCollection.updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: product }
    );
    return result.matchedCount > 0;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw new Error("Failed to update product by ID.");
  }
};

const deleteProductById = async (id) => {
  try {
    const productsCollection = await connectToDB();
    const result = await productsCollection.deleteOne({
      _id: ObjectId.createFromHexString(id),
    });
    return result.deletedCount > 0;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw new Error("Failed to delete product by ID.");
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
};
