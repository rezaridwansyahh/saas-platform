const express = require('express');
const router = express.Router();

const DepartmentRolesController = require('../controllers/departmentsRolesController.js');

const authMiddleware = require('../middlewares/authMiddleware');
const tenantMiddleware = require('../middlewares/tenantMiddleware');

router.use(tenantMiddleware);
router.use(authMiddleware);

router.get('/role/:roleId/', DepartmentRolesController.fetchDepartmentsByRoleId);
router.get('/department/:departmentId/', DepartmentRolesController.fetchRolesByDepartmentId);

router.post('/assign', DepartmentRolesController.assignRoleToDepartment);

router.delete('/remove', DepartmentRolesController.removeRoleFromDepartment);

module.exports = router;