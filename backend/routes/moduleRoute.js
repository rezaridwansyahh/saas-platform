const express = require('express');
const router = express.Router();

const modulesController = require('../controllers/modulesController.js');

const authToken = require('../middlewares/authMiddleware.js');
const upload = require('../middlewares/multer.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/', modulesController.getAllModules);
router.get('/module-company', modulesController.getAllModulesCompany);
router.get('/module-department', modulesController.getAllModulesDepartment);
router.get('/module-company/:id', modulesController.getModuleCompanybyId);
router.get('/module-department/:id', modulesController.getModuleDeparmentbyId);
router.get('/:id', modulesController.getModulebyId);
router.get('/:id/menus', modulesController.getMenusByModuleId);

router.post('/', modulesController.createModule_company_depatment);

router.put('/:id', modulesController.updateModule);

router.delete('/:id', modulesController.deleteModule);

module.exports = router;