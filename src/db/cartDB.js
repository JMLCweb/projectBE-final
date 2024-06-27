const { ObjectId } = require("mongodb");
const connectToDB = require("./connectDB");
const { getProduct } = require("../db/productsDB");

const getCart = async (userId) => {
  const db = await connectToDB();
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({
    _id: ObjectId.createFromHexString(userId),
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.cart;
};

const addToCart = async (userId, productId, quantity) => {
  const db = await connectToDB();
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    throw new Error("User not found");
  }

  const cartItemIndex = user.cart.findIndex((item) =>
    new ObjectId(item.productId).equals(new ObjectId(productId))
  );

  if (cartItemIndex !== -1) {
    throw new Error("Product is already in the cart");
  }

  const product = await getProduct(productId);

  user.cart.push({
    productId: new ObjectId(product._id),
    name: product.name,
    price: product.price,
    quantity,
    createdAt: new Date(),
  });

  await usersCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { cart: user.cart } }
  );

  return user.cart;
};

const updateCart = async (userId, productId, quantity) => {
  const db = await connectToDB();
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    throw new Error("User not found");
  }

  const cartItem = user.cart.find((item) =>
    new ObjectId(item.productId).equals(new ObjectId(productId))
  );

  if (!cartItem) {
    throw new Error("Product not found in cart");
  }

  cartItem.quantity = quantity;

  await usersCollection.updateOne(
    { _id: new ObjectId(userId), "cart.productId": new ObjectId(productId) },
    { $set: { "cart.$.quantity": quantity } }
  );

  return user.cart;
};

const removeFromCart = async (userId, productId) => {
  const db = await connectToDB();
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    throw new Error("User not found");
  }

  user.cart = user.cart.filter(
    (item) => !new ObjectId(item.productId).equals(new ObjectId(productId))
  );

  await usersCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { cart: user.cart } }
  );

  return user.cart;
};

const clearCart = async (userId) => {
  const db = await connectToDB();
  const usersCollection = db.collection("users");

  const user = await usersCollection.updateOne(
    { _id: ObjectId.createFromHexString(userId) },
    { $set: { cart: [] } }
  );

  return user;
};

module.exports = {
  addToCart,
  removeFromCart,
  updateCart,
  getCart,
  clearCart,
};
