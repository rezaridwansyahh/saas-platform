const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeeController.js');

router.get('/employee', employeeController.fetchEmployee);
router.get('/employee/:id', employeeController.fetchEmployeeId);
router.post('/employee', employeeController.createEmployee);
router.delete('/employee/:id', employeeController.removeEmployee);
router.put('/employee/:id', employeeController.updateEmploye);
module.exports = router;
