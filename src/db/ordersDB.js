const { ObjectId } = require('mongodb');
const connectToDB = require('./connectDB');
const sendEmail = require('../services/sendEmail');

const checkout = async (userId) => {
  const db = await connectToDB();
  const usersCollection = db.collection('users');
  const ordersCollection = db.collection('orders');

  const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    throw new Error('User not found');
  }

  if (!user.cart || user.cart.length === 0) {
    throw new Error('Cart is empty');
  }
  const totalPrice = user.cart
    .reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0)
    .toFixed(2);

  const newOrder = {
    _id: new ObjectId(),
    userId: user._id,
    items: user.cart,
    status: 'pending',
    notes: 'Order Info',
    totalPrice: totalPrice,
    address: user.address,
    country: user.country,
    zipcode: user.zipcode,
    city: user.city,
    paymentMethod: 'On delevery',
    orderDate: new Date(),
  };

  await ordersCollection.insertOne(newOrder);

  await usersCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { cart: [] } }
  );

  const subject = 'Checkout Confirmation';
  const text = `Hi ${user.name},\n\nThanks for your new Order\n\nOrder Details:\n${user.cart.map((item) => `${item.name} - ${item.quantity} x $${item.price}`).join('\n')}\n\nTotal: $${totalPrice}\n\nSend to:\n${user.address}, ${user.city}, ${user.country}, ${user.zipcode}\n\nPayment Method: ${newOrder.paymentMethod}\n\nOrder Date: ${newOrder.orderDate}`;

  try {
    await sendEmail(user.email, subject, text);
    console.log('E-mail successfully delivered.');
  } catch (error) {
    console.error('Error sending email:', error);
  }

  return newOrder;
};

const getAllOrders = async () => {
  const db = await connectToDB();
  const ordersCollection = db.collection('orders');
  return await ordersCollection.find().toArray();
};

const getOrderById = async (orderId) => {
  const db = await connectToDB();
  const ordersCollection = db.collection('orders');
  return await ordersCollection.findOne({ _id: new ObjectId(orderId) });
};

const updateOrderStatus = async (orderId, status, notes) => {
  const db = await connectToDB();
  const ordersCollection = db.collection('orders');

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
  const db = await connectToDB();
  const usersCollection = db.collection('users');
  const ordersCollection = db.collection('orders');

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

const deleteOrder = async (orderId) => {
  const db = await connectToDB();
  const ordersCollection = db.collection('orders');

  const result = await ordersCollection.deleteOne({
    _id: new ObjectId(orderId),
  });

  return result.deletedCount > 0;
};

module.exports = {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  moveOrderToHistory,
  checkout,
  deleteOrder,
};
