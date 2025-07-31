const express = require('express');
const router = express.Router();
const usersController= require('../controllers/usersController.js');
const middleRoutes = require('../middlewares/authMiddleware.js')

router.use(middleRoutes);
router.post('/', usersController.createUser);
router.get('/', usersController.fetchUsers);

module.exports = router;