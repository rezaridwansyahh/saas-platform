const express = require('express');
const router = express.Router();

const DepartmentController = require('../controllers/departmentController.js');

const authMiddleware = require('../middlewares/authMiddleware');
const tenantMiddleware = require('../middlewares/tenantMiddleware');

router.use(tenantMiddleware);
router.use(authMiddleware);

router.get('/', DepartmentController.fetchAllDepartments);
router.get('/:id', DepartmentController.fetchDepartmentById);
router.get('/:id/roles', DepartmentController.fetchRolesByDepartmentId);
router.get('/:id/employees', DepartmentController.fetchEmployeesByDepartmentId);
router.get('/:id/employees/roles', DepartmentController.fetchEmployeesWithRolesByDepartmentId);

module.exports = router;