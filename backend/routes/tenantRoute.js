const express = require('express');
const router = express.Router();

router.get('/tenant', (req, res) => {
  res.json({ tenant: req.tenant });
});

module.exports = router;