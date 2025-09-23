const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const tenantMiddleware = require('../middlewares/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

module.exports = router;