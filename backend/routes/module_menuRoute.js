const express = require('express');
const router = express.Router();
const ModuleMenuController = require('../controllers/module_menuController.js');

const authToken = require('../middlewares/authMiddleware.js');
const upload = require('../middlewares/multer.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/', ModuleMenuController.getAllModuleMenus);
router.get('/module/:module_id', ModuleMenuController.getModuleMenusByModuleId);
router.get('/menu/:menu_id', ModuleMenuController.getModuleMenusByMenuId);
router.get('/:id', ModuleMenuController.getModuleMenuById);

router.post('/', ModuleMenuController.createModuleMenu);

router.put('/:id', ModuleMenuController.updateModuleMenu);

router.delete('/:id', ModuleMenuController.deleteModuleMenu);

module.exports = router;