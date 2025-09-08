const express = require('express');
const router = express.Router();

const RolesController = require('../controllers/rolesController.js');
const tenantMiddleware = require('../middlewares/tenantMiddleware');

router.use(tenantMiddleware);

router.get('/', RolesController.fetchAllRoles);
router.get('/:id', RolesController.fetchRoleById);  

router.post('/', RolesController.createRole);

router.delete('/:id', RolesController.deleteRole);

router.put('/:id', RolesController.updateRole);

module.exports = router;