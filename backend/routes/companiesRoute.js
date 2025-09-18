const express = require('express');
const router = express.Router();

const CompaniesController = require('../controllers/companiesController.js');

const authMiddleware = require('../middlewares/authMiddleware.js');
const tenantMiddleware = require('../middlewares/tenantMiddleware.js');

router.use(tenantMiddleware);
router.use(authMiddleware);

router.get('/', CompaniesController.fetchCompanies);
router.get('/tenant', CompaniesController.fetchCompanyByTenant);
router.get('/module/:module_id', CompaniesController.getByModuleId);
router.get('/:id', CompaniesController.fetchCompanyById);

router.post('/', CompaniesController.createCompany);

router.delete('/:id', CompaniesController.deleteCompany);

router.put('/:id', CompaniesController.updateCompany);

module.exports = router;