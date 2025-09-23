const express = require('express');
const router = express.Router();

const MenuController = require('../controllers/MenuController.js');

const authToken = require('../middlewares/authMiddleware.js');
const upload = require('../middlewares/multer.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/', MenuController.getAll);
router.get('/module/:module_id', MenuController.getByModuleId);
router.get('/:id', MenuController.getById);

router.post('/', MenuController.create);

router.put('/:id', MenuController.update);

router.delete('/:id', MenuController.delete);



module.exports = router;