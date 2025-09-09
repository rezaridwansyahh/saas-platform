const express = require('express');
const router = express.Router();
const RoleMenuFunctionality = require('../controllers/role_menu_functionalityController.js');

const authToken = require('../middlewares/authMiddleware.js');
const upload = require('../middlewares/multer.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/', RoleMenuFunctionality.getAllRoleMenuFunctionality);
router.get('/role/:role_id', RoleMenuFunctionality.getRoleMenuFunctionalityByRoleId);
router.get('/module-menu/:module_menu_id', RoleMenuFunctionality.getRoleMenuFunctionalityByModuleMenuId);
router.get('/:role_id/:module_menu_id', RoleMenuFunctionality.getRoleMenuFunctionalityById);

router.post('/', RoleMenuFunctionality.createRoleMenuFunctionality);

router.delete('/:role_id/:module_menu_id', RoleMenuFunctionality.deleteRoleMenuFunctionality);

module.exports = router;