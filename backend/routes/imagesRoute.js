const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController');

const authMiddleware = require('../middlewares/authMiddleware');
const tenantMiddleware = require('../middlewares/tenantMiddleware');

router.use(tenantMiddleware);
router.use(authMiddleware); 

router.get('/:id/logo', imagesController.fetchLogoCompanyById);
// router.get('/:id', imagesController.fetchImageById);

module.exports = router;