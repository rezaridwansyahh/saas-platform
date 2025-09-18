const express = require('express');
const router = express.Router();

const EmployeeDepartmentController = require('../controllers/EmployeeDepartmentController.js');

const authMiddleware = require('../middlewares/authMiddleware.js');
const tenantMiddleware = require('../middlewares/tenantMiddleware.js');

router.use(tenantMiddleware);
router.use(authMiddleware);

router.get('/', EmployeeDepartmentController.getAll);
router.get('/details', EmployeeDepartmentController.getAllWithDetails);
router.get('/id', EmployeeDepartmentController.getById);
router.get('/employee/:employee_id/', EmployeeDepartmentController.getByEmployeeId);
router.get('/department/:department_id/', EmployeeDepartmentController.getByDepartmentId);
router.get('/employee/:employee_id/department/:department_id/', EmployeeDepartmentController.getByEmployeeAndDepartment);

router.post('/create', EmployeeDepartmentController.create);

router.delete('/delete', EmployeeDepartmentController.delete);

module.exports = router;