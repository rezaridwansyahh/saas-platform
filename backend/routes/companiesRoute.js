const express = require('express');
const router = express.Router();
const companiesController= require('../controllers/companiesController.js');
<<<<<<< HEAD
const authToken = require('../middlewares/authMiddleware.js');

router.use(authToken); // Apply authToken middleware to all routes in this file
=======
const middleRoutes = require('../middlewares/authMiddleware.js');
const tenantMiddleware = require('../middlewares/tenantMiddleware');
>>>>>>> 8cc8ba99f0ef209a62339534b09e4df54728ba11

router.use(tenantMiddleware);
router.use(middleRoutes);
// GET all employees
router.get('/', companiesController.fetchCompanies);
router.get('/:id', companiesController.fetchCompanyById);
router.post('/', companiesController.createCompany);

module.exports = router;