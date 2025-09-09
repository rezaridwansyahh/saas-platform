const express = require('express');
const router = express.Router();
const ModuleCompanyController = require('../controllers/module_companyController.js');

const authToken = require('../middlewares/authMiddleware.js');
const upload = require('../middlewares/multer.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/', ModuleCompanyController.getAllModuleCompany);
router.get('/company/:company_id', ModuleCompanyController.getModuleCompanyByCompanyId);
router.get('/module/:module_id', ModuleCompanyController.getModuleCompanyByModuleId);
router.get('/:id', ModuleCompanyController.getModuleCompanyById);

router.post('/', ModuleCompanyController.createModuleCompany);

router.put('/:id', ModuleCompanyController.updateModuleCompany);

router.delete('/:id', ModuleCompanyController.deleteModuleCompany);

module.exports = router;


/halo upi aku nicho/