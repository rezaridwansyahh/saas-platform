const express = require('express');
const router = express.Router();
const companiesController= require('../controllers/companiesController.js');

// GET all employees
router.get('/', companiesController.fetchCompanies);
router.get('/:id', companiesController.fetchCompanyById);
router.post('/', companiesController.createCompany);
module.exports = router;