const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const employeeController = require('../controllers/employeeController.js');

const authToken = require('../middlewares/authMiddleware.js');
const upload = require('../middlewares/multer.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/company/:id', employeeController.fetchEmployeeByCompanyId);
router.get('/:id', employeeController.fetchEmployeeId);

router.post('/', upload.single('profile_picture'), employeeController.createEmployee);

router.delete('/:id', employeeController.removeEmployee);

router.put('/:id', upload.single('profile_picture'), employeeController.updateEmployee);

module.exports = router;