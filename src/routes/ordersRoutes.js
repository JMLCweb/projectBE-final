const express = require('express');
const ordersController = require('../controllers/ordersController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/role');
const verifyId = require('../middleware/verifyId');

const router = express.Router();

router.use(auth.isAuthenticated);
router.post(
  '/checkout/:userId',
  verifyId.IdentifyUser,
  ordersController.checkoutCart
);

router.use(checkRole('admin'));

router.get('/', ordersController.fetchAllOrders);
router.get('/:orderId', ordersController.fetchOrderById);
router.put('/update/:orderId', ordersController.newOrderStatus);
router.delete('/delete/:orderId', ordersController.deleteOrder);

module.exports = router;
