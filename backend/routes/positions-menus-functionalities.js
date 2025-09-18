const express = require('express');
const router = express.Router();
const PositionMenuFunctionalityController = require('../controllers/PositionMenuFunctionalityController.js');

const authToken = require('../middlewares/authMiddleware.js');
const upload = require('../middlewares/multer.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/', PositionMenuFunctionalityController.getAll);
router.get('/position/:position_id', PositionMenuFunctionalityController.getByPositionId);
router.get('/module-menu/:module_menu_id', PositionMenuFunctionalityController.getByModuleMenuId);
router.get('/position/:position_id/module-menu/:module_menu_id', PositionMenuFunctionalityController.getByPositionIdAndModuleMenuId);
router.get('/:id', PositionMenuFunctionalityController.getById);

router.post('/', PositionMenuFunctionalityController.create);

router.put('/:id', PositionMenuFunctionalityController.update);

router.delete('/:id', PositionMenuFunctionalityController.delete);

module.exports = router;