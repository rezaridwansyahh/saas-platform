const express = require('express');
const router = express.Router();
const RolesController = require('../controllers/rolesController.js');
const tenantMiddleware = require('../middlewares/tenantMiddleware');

router.use(tenantMiddleware);

router.get('/', RolesController.fetchAllRoles);
router.get('/:id', RolesController.fetchRoleById);  
router.get('/:id/departments', RolesController.fetchDepartmentsByRoleId);

module.exports = router;