const express = require('express');
const router = express.Router();
const ModuleDepartmentController = require('../controllers/module_departmentController.js');

const authToken = require('../middlewares/authMiddleware.js');
const upload = require('../middlewares/multer.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/', ModuleDepartmentController.getAllModuleDepartment);
router.get('/department/:department_id', ModuleDepartmentController.getModuleDepartmentsByDepartmentId);
router.get('/module/:module_id', ModuleDepartmentController.getModuleDepartmentByModuleId);
router.get('/:id', ModuleDepartmentController.getModuleDepartmentById);

router.post('/', ModuleDepartmentController.createModuleDepartment);
router.put('/:id', ModuleDepartmentController.updateModuleDepartment);
router.delete('/:id', ModuleDepartmentController.deleteModuleDepartment);

module.exports = router;