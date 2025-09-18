const express = require('express');
const router = express.Router();

const DepartmentPositionController = require('../controllers/DepartmentPositionController.js');

const authMiddleware = require('../middlewares/authMiddleware.js');
const tenantMiddleware = require('../middlewares/tenantMiddleware.js');

router.use(tenantMiddleware);
router.use(authMiddleware);

router.get('/', DepartmentPositionController.getAll);
router.get('/details', DepartmentPositionController.getAllWithDetails);
router.get('/:id', DepartmentPositionController.getById);
router.get('/department/:department_id/', DepartmentPositionController.getByDepartmentId);
router.get('/position/:position_id/', DepartmentPositionController.getByDepartmentId);
router.get('/department/:department_id/position/:position_id', DepartmentPositionController.getByDepartmentAndPosition)

router.post('/', DepartmentPositionController.create);

router.delete('/', DepartmentPositionController.delete);

module.exports = router;