const express = require('express');
const router = express.Router();

const RoleController = require('../controllers/RoleController.js');
const tenantMiddleware = require('../middlewares/tenantMiddleware.js');

router.use(tenantMiddleware);

router.get('/', RoleController.getAll);
router.get('/:id', RoleController.getById);
router.get('/company/:company_id', RoleController.getByCompanyId);

router.post('/', RoleController.create);

router.delete('/:id', RoleController.delete);

router.put('/:id', RoleController.update);

module.exports = router;