const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController.js');
const authToken = require('../middlewares/authMiddleware.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/', employeeController.fetchEmployeeByCompanyId);
router.get('/:id', employeeController.fetchEmployeeId);

router.post('/', employeeController.createEmployee);

router.delete('/:id', employeeController.removeEmployee);

router.put('/:id', employeeController.updateEmployee);

module.exports = router;