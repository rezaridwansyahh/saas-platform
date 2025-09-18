const express = require('express');
const router = express.Router();

const CompanyController = require('../controllers/CompanyController.js');

const authMiddleware = require('../middlewares/authMiddleware.js');
const tenantMiddleware = require('../middlewares/tenantMiddleware.js');

router.use(tenantMiddleware);
router.use(authMiddleware);

router.get('/', CompanyController.getAll);
router.get('/tenant', CompanyController.getByTenantName);
router.get('/module/:module_id', CompanyController.getByModuleId);
router.get('/:id', CompanyController.getById);

router.post('/', CompanyController.create);

router.delete('/:id', CompanyController.delete);

router.put('/:id', CompanyController.update);

module.exports = router;