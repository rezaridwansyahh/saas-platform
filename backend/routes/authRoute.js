const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authController');
const tenantMiddleware = require('../middlewares/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/login', AuthController.loginUser);
router.post('/register', AuthController.registerUser);

module.exports = router;