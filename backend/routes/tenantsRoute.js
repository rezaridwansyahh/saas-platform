const express = require('express');
const router = express.Router();
const tenantMiddleware = require('../middlewares/tenantMiddleware.js');

router.use(tenantMiddleware);

router.get('/tenant', (req, res) => {
  res.json({
    message: `This is, ${req.tenant}`,
    tenant: req.tenant,
  });
});

module.exports = router;
