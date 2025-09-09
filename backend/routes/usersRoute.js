const express = require('express');
const router = express.Router();

const UsersController= require('../controllers/usersController.js');
const authToken = require('../middlewares/authMiddleware.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/', UsersController.fetchAllUsers);
router.get('/:id', UsersController.fetchUserById);

router.post('/', UsersController.createUser);

router.delete('/:id', UsersController.deleteUser);

router.put('/:id', UsersController.updateUser);

module.exports = router;