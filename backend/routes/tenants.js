const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ tenant: req.tenant });
});

module.exports = router;