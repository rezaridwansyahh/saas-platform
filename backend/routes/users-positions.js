const express = require('express');
const router = express.Router();

const UserPositionController = require('../controllers/UserPositionController.js');

const authMiddleware = require('../middlewares/authMiddleware.js');
const tenantMiddleware = require('../middlewares/tenantMiddleware.js');

router.use(tenantMiddleware);
router.use(authMiddleware);

router.get('/', UserPositionController.getAll);
router.get('/details', UserPositionController.getAllDetails);
router.get('/:id', UserPositionController.getById);
router.get('/user/:user_id', UserPositionController.getByUserId);
router.get('/position/:position_id', UserPositionController.getByPositionId);
router.get('/user/:user_id/position/:position_id', UserPositionController.getByUserAndPosition);

router.post('/', UserPositionController.create);

router.delete('/:id', UserPositionController.delete);

module.exports = router;