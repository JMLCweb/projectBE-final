const { MongoClient, ObjectId } = require("mongodb");

const mongoUrl = process.env.MONGO_URL;
const client = new MongoClient(mongoUrl);

const connectToDB = async () => {
  try {
    await client.connect();
    const db = client.db("projectDB");
    return {
      usersCollection: db.collection("users"),
      ordersCollection: db.collection("orders"),
    };
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Failed to connect to the database.");
  }
};

const checkout = async (userId) => {
  const { usersCollection, ordersCollection } = await connectToDB();
  const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.cart || user.cart.length === 0) {
    throw new Error("Cart is empty");
  }

  const newOrder = {
    _id: new ObjectId(),
    userId: user._id,
    items: user.cart,
    orderDate: new Date(),
    status: "pending",
    notes: "Order Info",
  };

  await ordersCollection.insertOne(newOrder);

  await usersCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { cart: [] } }
  );

  return newOrder;
};

const getAllOrders = async () => {
  const { ordersCollection } = await connectToDB();
  const orders = await ordersCollection.find().toArray();
  return orders;
};

const getOrderById = async (orderId) => {
  const { ordersCollection } = await connectToDB();
  const order = await ordersCollection.findOne({ _id: new ObjectId(orderId) });
  return order;
};

const updateOrderStatus = async (orderId, status, notes) => {
  const { ordersCollection } = await connectToDB();
  const updateData = {
    status,
    updatedAt: new Date(),
  };

  if (notes !== undefined) {
    updateData.notes = notes;
  }

  const result = await ordersCollection.updateOne(
    { _id: new ObjectId(orderId) },
    {
      $set: updateData,
    }
  );

  return result.matchedCount > 0;
};

const moveOrderToHistory = async (userId, orderId) => {
  const { usersCollection, ordersCollection } = await connectToDB();
  const order = await ordersCollection.findOne({ _id: new ObjectId(orderId) });
  if (!order) return false;

  const result = await usersCollection.updateOne(
    { _id: new ObjectId(userId) },
    {
      $push: { ordersHistory: order },
    }
  );

  if (result.modifiedCount > 0) {
    await ordersCollection.deleteOne({ _id: new ObjectId(orderId) });
  }

  return result.modifiedCount > 0;
};

module.exports = {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  moveOrderToHistory,
  checkout,
};
