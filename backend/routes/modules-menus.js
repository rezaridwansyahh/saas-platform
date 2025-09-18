const express = require('express');
const router = express.Router();
const ModuleMenuController = require('../controllers/ModuleMenuController.js');

const authToken = require('../middlewares/authMiddleware.js');
const upload = require('../middlewares/multer.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/', ModuleMenuController.getAll);
router.get('/module/:module_id/menu/:menu_id', ModuleMenuController.getbyModuleIdAndMenuId);
router.get('/module/:module_id', ModuleMenuController.getbyModuleId);
router.get('/menu/:menu_id', ModuleMenuController.getbyMenuId);
router.get('/:id', ModuleMenuController.getById);

router.post('/', ModuleMenuController.create);

router.put('/:id', ModuleMenuController.update);

router.delete('/:id', ModuleMenuController.delete);

module.exports = router;