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

module.exports = router;