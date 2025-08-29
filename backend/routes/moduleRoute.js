const express = require('express');
const router = express.Router();

const modulesController = require('../controllers/modulesController.js');

const authToken = require('../middlewares/authMiddleware.js');
const upload = require('../middlewares/multer.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/', modulesController.getAllModules);
router.get('/:id', modulesController.getModulebyId);
router.get('/:id/menus', modulesController.getMenusByModuleId);

router.post('/', modulesController.createModule);

router.put('/:id', modulesController.updateModule);

router.delete('/:id', modulesController.deleteModule);

// COMING SOON
// router.get('/company/', modulesController.getCompanyModules);
// router.get('/user/accessible', modulesController.getUserModules);
// router.get('/:id/user-menus', modulesController.getUserModulesWithMenus);
// router.post('/:id/departments', modulesController.assignDepartmentToModule);
// router.post('/:id/menu-mapping', modulesController.mapMenuToModule);
// router.delete('/:id/departments', modulesController.removeDepartmentFromModule);

module.exports = router;