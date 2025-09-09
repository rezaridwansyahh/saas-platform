const express = require('express');
const router = express.Router();

const ImagesController = require('../controllers/imagesController');

const authMiddleware = require('../middlewares/authMiddleware');
const tenantMiddleware = require('../middlewares/tenantMiddleware');

router.use(tenantMiddleware);
router.use(authMiddleware);

router.get('/company/:id/logo', ImagesController.fetchLogoCompanyById);
router.get('/employee/:id/profile', ImagesController.fetchProfileImageByEmployeeId);

module.exports = router;