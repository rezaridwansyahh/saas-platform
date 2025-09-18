const express = require('express');
const router = express.Router();

const menusController = require('../controllers/MenuController.js');

const authToken = require('../middlewares/authMiddleware.js');
const upload = require('../middlewares/multer.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/', menusController.getAll);
router.get('/module/:module_id', menusController.getByModuleId);
router.get('/:id', menusController.getById);

router.post('/', menusController.create);

router.put('/:id', menusController.update);

router.delete('/:id', menusController.delete);



module.exports = router;