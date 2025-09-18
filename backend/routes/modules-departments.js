const express = require('express');
const router = express.Router();
const ModuleDepartmentController = require('../controllers/ModuleDepartmentController.js');

const authToken = require('../middlewares/authMiddleware.js');
const upload = require('../middlewares/multer.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/', ModuleDepartmentController.getAll);
router.get('/detail', ModuleDepartmentController.getAllWithDetails);
router.get('/module/:module_id/department/:department_id', ModuleDepartmentController.getByModuleIdAndDepartmentId);
router.get('/module/:module_id', ModuleDepartmentController.getByModuleId);
router.get('/department/:department_id', ModuleDepartmentController.getByDepartmentId);
router.get('/:id', ModuleDepartmentController.getById);

router.post('/', ModuleDepartmentController.create);

router.put('/:id', ModuleDepartmentController.update);

router.delete('/:id', ModuleDepartmentController.delete);

module.exports = router;