const express = require('express');
const router = express.Router();
const companiesController= require('../controllers/companiesController.js');
const middleRoutes = require('../middlewares/authMiddleware.js');
const tenantMiddleware = require('../middlewares/tenantMiddleware');

router.use(tenantMiddleware);
router.use(middleRoutes);
// GET all employees
router.get('/', companiesController.fetchCompanies);
router.get('/:id', companiesController.fetchCompanyById);
router.post('/', companiesController.createCompany);

module.exports = router;