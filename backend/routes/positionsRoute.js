const express = require('express');
const router = express.Router();

const PositionsController = require('../controllers/positionsController.js');

const authToken = require('../middlewares/authMiddleware.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/company/:id', PositionsController.fetchPositionsByCompanyId);
router.get('/:id', PositionsController.fetchPositionsById);

router.post('/', PositionsController.addPosition);
router.delete('/:id', PositionsController.deletePosition);
router.put('/:id', PositionsController.editPosition);

module.exports = router;