const express = require('express');
const router = express.Router();

const menusController = require('../controllers/menusController.js');

const authToken = require('../middlewares/authMiddleware.js');
const upload = require('../middlewares/multer.js');

// router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/', menusController.getAllMenus);
router.get('/:id', menusController.getMenuById);
router.get('/module/:module_id', menusController.getMenusByModuleId);
router.get('/company/:company_id', menusController.getMenusByCompanyId);

router.post('/', menusController.createMenu);

router.put('/:id', menusController.updateMenu);

router.delete('/:id', menusController.deleteMenu);



module.exports = router;