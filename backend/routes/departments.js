const express = require('express');
const router = express.Router();

const DepartmentController = require('../controllers/DepartmentController.js');

const authMiddleware = require('../middlewares/authMiddleware.js');
const tenantMiddleware = require('../middlewares/tenantMiddleware.js');

router.use(tenantMiddleware);
router.use(authMiddleware);

router.get('/', DepartmentController.getAll);
router.get('/:id', DepartmentController.getById);
router.get('/company/:company_id', DepartmentController.getByCompanyId);
router.get('/position/:position_id', DepartmentController.getByPositionId);
router.get('/employee/:employee_id', DepartmentController.getByEmployeeId)

router.post('/', DepartmentController.create);

router.delete('/:id', DepartmentController.delete);

router.put('/:id', DepartmentController.update);

module.exports = router;
