const express = require('express');
const router = express.Router();

const modulesController = require('../controllers/ModuleController.js');

const authToken = require('../middlewares/authMiddleware.js');
const upload = require('../middlewares/multer.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/', modulesController.getAll);
router.get('/company/:company_id', modulesController.getByCompanyId);
router.get('/department/:department_id', modulesController.getByDepartmentId);
router.get('/company/:company_id/department/:department_id', modulesController.getByCompanyIdAndDepartmentId);
router.get('/:id', modulesController.getById);

router.post('/', modulesController.create);

router.put('/:id', modulesController.update);

router.delete('/:id', modulesController.delete);

module.exports = router;