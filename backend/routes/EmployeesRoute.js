const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeeController.js');
const authToken = require('../middlewares/authMiddleware.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.use(middleRoutes);
router.get('/employee', employeeController.fetchEmployee);
router.get('/employee/:id', employeeController.fetchEmployeeId);
router.post('/employee', employeeController.createEmployee);
router.delete('/employee/:id', employeeController.removeEmployee);
router.put('/employee/:id', employeeController.updateEmploye);
module.exports = router;
