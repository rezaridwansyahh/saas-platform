const express = require('express');
const router = express.Router();

const EmployeesDepartmentsController = require('../controllers/employeesDepartmentsController.js');

const authMiddleware = require('../middlewares/authMiddleware');
const tenantMiddleware = require('../middlewares/tenantMiddleware');

router.use(tenantMiddleware);
router.use(authMiddleware);

router.get('/employee/:employeeId/', EmployeesDepartmentsController.fetchDepartmentsByEmployeeId);
router.get('/department/:departmentId/', EmployeesDepartmentsController.fetchEmployeesByDepartmentId);

router.post('/assign', EmployeesDepartmentsController.assignEmployeeToDepartment);

router.delete('/remove', EmployeesDepartmentsController.removeEmployeeFromDepartment);

module.exports = router;