const { MongoClient, ObjectId } = require("mongodb");

const mongoUrl = process.env.MONGO_URL;
let client;

const connectToDB = async () => {
  if (!client || !client.topology || client.topology.isDestroyed()) {
    client = new MongoClient(mongoUrl);
    await client.connect();
  }
  return client.db("projectDB");
};

const getUsersCollection = async () => {
  const db = await connectToDB();
  return db.collection("users");
};

const addToCart = async (userId, productId, quantity) => {
  const usersCollection = await getUsersCollection();
  const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    throw new Error("User not found");
  }

  const cartItem = user.cart.find((item) => item.productId.equals(productId));

  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    user.cart.push({ productId: new ObjectId(productId), quantity });
  }

  await usersCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { cart: user.cart } }
  );

  return user.cart;
};

const removeFromCart = async (userId, productId) => {
  const usersCollection = await getUsersCollection();
  const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    throw new Error("User not found");
  }

  user.cart = user.cart.filter((item) => !item.productId.equals(productId));

  await usersCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { cart: user.cart } }
  );

  return user.cart;
};

const getCart = async (userId) => {
  const usersCollection = await getUsersCollection();
  const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    throw new Error("User not found");
  }

  return user.cart;
};

const clearCart = async (userId) => {
  const usersCollection = await getUsersCollection();
  await usersCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { cart: [] } }
  );

  return [];
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
  clearCart,
};
