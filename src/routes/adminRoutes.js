const express = require('express');
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/role');
const router = express.Router();

router.post('/login', adminController.loginAdmin);

router.use(auth.isAuthenticated);

router.post('/register', checkRole('admin'), adminController.createAdmin);
router.get('/', checkRole('admin'), adminController.fetchAllAdmins);
router.get('/:id', checkRole('admin'), adminController.fetchAdminById);
router.put('/update/:id', checkRole('admin'), adminController.modifyAdminById);
router.delete(
  '/delete/:id',
  checkRole('admin'),
  adminController.removeAdminById
);

module.exports = router;
