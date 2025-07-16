const express = require('express');
const router = express.Router();
const usersController= require('../controllers/usersController.js');

router.post('/', usersController.createUser);
router.get('/', usersController.fetchUsers);

module.exports = router;