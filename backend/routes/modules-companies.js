const express = require('express');
const router = express.Router();
const ModuleCompanyController = require('../controllers/ModuleCompanyController.js');

const authToken = require('../middlewares/authMiddleware.js');
const upload = require('../middlewares/multer.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/', ModuleCompanyController.getAll);
router.get('/details/', ModuleCompanyController.getAllWithDetail);
router.get('/module/:module_id/company/:company_id', ModuleCompanyController.getByModuleIdAndCompanyId);
router.get('/module/:module_id', ModuleCompanyController.getByModuleId);
router.get('/company/:company_id', ModuleCompanyController.getByCompanyId);
router.get('/:id', ModuleCompanyController.getById);

router.post('/', ModuleCompanyController.create);

router.delete('/:id', ModuleCompanyController.delete);

module.exports = router;