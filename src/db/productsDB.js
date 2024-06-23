const { ObjectId } = require("mongodb");
const connectToDB = require("./connectDB");

const addProduct = async (product) => {
  const db = await connectToDB();
  const productsCollection = db.collection("products");
  const newProduct = {
    ...product,
    createdAt: new Date(),
  };
  const result = await productsCollection.insertOne(newProduct);
  return { id: result.insertedId, ...newProduct };
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
    _id: new ObjectId(),
    userId,
    rating,
    comment,
    createdAt: new Date(),
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

const editReview = async (productId, reviewId, userId, rating, comment) => {
  const db = await connectToDB();
  const productsCollection = db.collection("products");
  const product = await productsCollection.findOne({
    _id: new ObjectId(productId),
    "reviews._id": new ObjectId(reviewId),
    "reviews.userId": userId,
  });

  if (!product) {
    throw new Error("Review not found or user not authorized");
  }

  const review = product.reviews.find(
    (item) => item._id.equals(new ObjectId(reviewId)) && item.userId === userId
  );

  if (!review) {
    throw new Error("Review not found or user not authorized");
  }

  review.rating = rating;
  review.comment = comment;
  review.updatedAt = new Date();

  const result = await productsCollection.updateOne(
    { _id: new ObjectId(productId) },
    { $set: { reviews: product.reviews } }
  );

  if (result.matchedCount === 0) {
    throw new Error("Review not found or user not authorized");
  }

  return result;
};

const removeReview = async (productId, reviewId) => {
  const db = await connectToDB();
  const productsCollection = db.collection("products");

  const result = await productsCollection.updateOne(
    { _id: new ObjectId(productId) },
    { $pull: { reviews: { _id: new ObjectId(reviewId) } } }
  );

  if (result.matchedCount === 0) {
    throw new Error("Product or review not found");
  }

  return result;
};

const deleteProductById = async (id) => {
  const db = await connectToDB();
  const productsCollection = db.collection("products");
  const result = await productsCollection.deleteOne({
    _id: ObjectId.createFromHexString(id),
  });
  return result.deletedCount > 0;
};

const addToFavorites = async (userId, productId) => {
  const db = await connectToDB();
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    throw new Error("User not found");
  }

  const isAlreadyFavorite = user.favorites.some((favorite) =>
    new ObjectId(favorite.productId).equals(new ObjectId(productId))
  );

  if (isAlreadyFavorite) {
    return false;
  }

  const favorite = {
    productId,
    date: new Date(),
  };
  const result = await usersCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $addToSet: { favorites: favorite } }
  );

  console.log(`Update result: ${JSON.stringify(result)}`);

  return result.matchedCount > 0;
};

const removeFromFavorites = async (userId, productId) => {
  const db = await connectToDB();
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    throw new Error("User not found");
  }

  user.favorites = user.favorites.filter(
    (item) => !new ObjectId(item.productId).equals(new ObjectId(productId))
  );

  await usersCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { favorites: user.favorites } }
  );

  return user.favorites;
};

module.exports = {
  addProduct,
  getAllProducts,
  getProduct,
  updateProductById,
  addReview,
  editReview,
  removeReview,
  deleteProductById,
  addToFavorites,
  removeFromFavorites,
};
