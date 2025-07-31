const express = require('express');
const router = express.Router();
const companiesController= require('../controllers/companiesController.js');
const authToken = require('../middlewares/authMiddleware.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

// GET all employees
router.get('/', companiesController.fetchCompanies);
router.get('/:id', companiesController.fetchCompanyById);
router.post('/', companiesController.createCompany);
module.exports = router;