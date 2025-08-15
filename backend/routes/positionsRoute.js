const express = require('express');
const router = express.Router();

const positionsController = require('../controllers/positionsController.js');

const authToken = require('../middlewares/authMiddleware.js');
const { route } = require('./employeesRoute');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/company/:id', positionsController.fetchPositionsIdByCompanyId);
router.get('/:id', positionsController.fetchPositionsId);

router.post('/', positionsController.addPosition);
router.delete('/:id', positionsController.deletePosition);
router.put('/:id', positionsController.editPosition);

module.exports = router;