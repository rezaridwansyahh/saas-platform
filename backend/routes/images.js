const express = require('express');
const router = express.Router();

const ImageController = require('../controllers/ImageController');

const authMiddleware = require('../middlewares/authMiddleware');
const tenantMiddleware = require('../middlewares/tenantMiddleware');

router.use(tenantMiddleware);
router.use(authMiddleware);

router.get('/company/:company_id/logo', ImageController.getByCompanyId);
router.get('/employee/:employee_id/profile', ImageController.getByEmployeeId);

module.exports = router;