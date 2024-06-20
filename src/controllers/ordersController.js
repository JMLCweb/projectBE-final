const {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  moveOrderToHistory,
  checkout,
} = require("../db/ordersDB");

const fetchAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchOrderById = async (req, res) => {
  try {
    const order = await getOrderById(req.params.orderId);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
    } else {
      res.json(order);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const newOrderStatus = async (req, res) => {
  const { status, notes } = req.body;
  try {
    const order = await getOrderById(req.params.orderId);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    const updated = await updateOrderStatus(req.params.orderId, status, notes);
    if (!updated) {
      res.status(500).json({ message: "Failed to update order status" });
      return;
    }

    if (status === "completed") {
      await moveOrderToHistory(order.userId, req.params.orderId);
    }

    res.json({ message: "Order status Completed and moved for history" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkoutCart = async (req, res) => {
  try {
    const newOrder = await checkout(req.params.userId);
    res.json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  fetchAllOrders,
  fetchOrderById,
  newOrderStatus,
  checkoutCart,
};
