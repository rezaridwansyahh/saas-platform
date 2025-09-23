const express = require('express');
const router = express.Router();

const ModuleController = require('../controllers/ModuleController.js');

const authToken = require('../middlewares/authMiddleware.js');
const upload = require('../middlewares/multer.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/', ModuleController.getAll);
router.get('/department/:department_id', ModuleController.getByDepartmentId);
router.get('/company/:company_id', ModuleController.getByCompanyId);
router.get('/:id', ModuleController.getById);

router.post('/', ModuleController.create);

router.put('/:id', ModuleController.update);

router.delete('/:id', ModuleController.delete);

module.exports = router;