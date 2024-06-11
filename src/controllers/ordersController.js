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
    const updated = await updateOrderStatus(req.params.orderId, status, notes);
    if (!updated) {
      res.status(404).json({ message: "Order not found" });
    } else {
      if (status === "completed") {
        await moveOrderToHistory(req.params.userId, req.params.orderId);
      }
      res.json({ message: "Order status updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkoutCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const newOrder = await checkout(userId);
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
