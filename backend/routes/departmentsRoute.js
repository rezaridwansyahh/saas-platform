const express = require('express');
const router = express.Router();

const DepartmentsController = require('../controllers/departmentController.js');

const authMiddleware = require('../middlewares/authMiddleware');
const tenantMiddleware = require('../middlewares/tenantMiddleware');

router.use(tenantMiddleware);
router.use(authMiddleware);

router.get('/', DepartmentsController.fetchAllDepartments);
router.get('/company/:companyId', DepartmentsController.fetchDepartmentByCompanyId);
router.get('/module/:module_id', DepartmentsController.fetchDepartmentByCompanyId);
router.get('/:id', DepartmentsController.fetchDepartmentById);

router.post('/', DepartmentsController.createDepartment);

router.delete('/:id/company/:companyId', DepartmentsController.deleteDepartment);

router.put('/:id/company/:companyId', DepartmentsController.updateDepartment);

module.exports = router;