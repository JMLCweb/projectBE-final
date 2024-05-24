const { MongoClient, ObjectId } = require("mongodb");

const mongoUrl = process.env.MONGO_URL;
const client = new MongoClient(mongoUrl);

const connectToDB = async () => {
  try {
    await client.connect();
    const db = client.db("projectDB");
    return db.collection("users");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Failed to connect to the database.");
  }
};

const addToCart = async (userId, productId, quantity) => {
  const usersCollection = await connectToDB();
  const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    throw new Error("User not found");
  }

  const cartItem = user.cart.find((item) =>
    item.productId.equals(new ObjectId(productId))
  );

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
  const usersCollection = await connectToDB();
  const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    throw new Error("User not found");
  }

  user.cart = user.cart.filter(
    (item) => !item.productId.equals(new ObjectId(productId))
  );

  await usersCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { cart: user.cart } }
  );

  return user.cart;
};

const getCart = async (userId) => {
  const usersCollection = await connectToDB();
  const user = await usersCollection.findOne({
    _id: ObjectId.createFromHexString(userId),
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.cart;
};

const clearCart = async (userId) => {
  const usersCollection = await connectToDB();
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
