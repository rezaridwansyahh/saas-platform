const express = require('express');
const router = express.Router();

const UserController= require('../controllers/UserController.js');
const authToken = require('../middlewares/authMiddleware.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.get('/employee/:employee_id', UserController.getByEmployeeId);
router.get('/position/:position_id', UserController.getByPositionId);

router.post('/', UserController.create);

router.delete('/:id', UserController.delete);

router.put('/:id', UserController.update);

module.exports = router;