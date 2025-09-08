const express = require('express');
const router = express.Router();

const EmployeesController = require('../controllers/employeeController.js');

const authToken = require('../middlewares/authMiddleware.js');
const upload = require('../middlewares/multer.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/company/:id', EmployeesController.fetchEmployeeByCompanyId);
router.get('/:id', EmployeesController.fetchEmployeeId);

router.post('/', upload.single('profile_picture'), EmployeesController.createEmployee);

router.delete('/:id', EmployeesController.removeEmployee);

router.put('/:id', upload.single('profile_picture'), EmployeesController.updateEmployee);

module.exports = router;