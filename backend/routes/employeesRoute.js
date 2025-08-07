const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const employeeController = require('../controllers/employeeController.js');
const authToken = require('../middlewares/authMiddleware.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const tenant = req.user.tenant;
    const companyId = req.user.companyId;

    const folderPath = path.join(
      'assets',
      `${tenant}_${companyId}`,
      'employees'
    );

    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    const { id } = req.params;
    cb(null, `employee_${id}.jpeg`);
  }
});

const upload = multer({ storage }); // as configured

router.get('/company/:id', employeeController.fetchEmployeeByCompanyId);
router.get('/:id', employeeController.fetchEmployeeId);

router.post('/', employeeController.createEmployee);

router.delete('/:id', employeeController.removeEmployee);

router.put('/:id', upload.single('profile_picture'), employeeController.updateEmployee);

module.exports = router;