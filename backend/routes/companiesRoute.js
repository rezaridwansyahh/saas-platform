const express = require('express');
const router = express.Router();
const companiesController= require('../controllers/companiesController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const tenantMiddleware = require('../middlewares/tenantMiddleware.js');

router.use(tenantMiddleware);
router.use(authMiddleware);
// GET all employees
router.get('/', companiesController.fetchCompanies);
router.get('/tenant', companiesController.fetchCompanyByTenant);

router.get('/:id', companiesController.fetchCompanyById);

router.post('/', companiesController.createCompany);

module.exports = router;