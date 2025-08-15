const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController');

const authMiddleware = require('../middlewares/authMiddleware');
const tenantMiddleware = require('../middlewares/tenantMiddleware');

router.use(tenantMiddleware);
router.use(authMiddleware);

router.get('/company/:id/logo', imagesController.fetchLogoCompanyById);
router.get('/employee/:id/profile', imagesController.fetchProfileImageByEmployeeId);

module.exports = router;