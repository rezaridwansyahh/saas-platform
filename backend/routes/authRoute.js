const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const tenantMiddleware = require('../middlewares/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);

module.exports = router;