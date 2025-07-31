const express = require('express');
const router = express.Router();
const usersController= require('../controllers/usersController.js');
const authToken = require('../middlewares/authMiddleware.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.use(middleRoutes);
router.post('/', usersController.createUser);
router.get('/', usersController.fetchUsers);

module.exports = router;