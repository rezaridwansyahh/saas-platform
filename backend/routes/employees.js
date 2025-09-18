const express = require('express');
const router = express.Router();

const EmployeeController = require('../controllers/EmployeeController.js');

const authToken = require('../middlewares/authMiddleware.js');
const upload = require('../middlewares/multer.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/', EmployeeController.getAll);
router.get('/:id', EmployeeController.getById);
router.get('/company/:company_id', EmployeeController.getByCompanyId);
router.get('/department/:department_id', EmployeeController.getByDepartmentId);

router.post('/', upload.single('profile_picture'), EmployeeController.create);

router.delete('/:id', EmployeeController.delete);

router.put('/:id', upload.single('profile_picture'), EmployeeController.update);

module.exports = router;