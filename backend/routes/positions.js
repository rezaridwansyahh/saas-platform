const express = require('express');
const router = express.Router();

const PositionController = require('../controllers/PositionController.js');

const authToken = require('../middlewares/authMiddleware.js');

router.use(authToken); // Apply authToken middleware to all routes in this file

router.get('/', PositionController.getAll);
router.get('/:id', PositionController.getById);

router.get('/department/:department_id', PositionController.getByDepartmentId);
router.get('/user/:user_id', PositionController.getByUserId);
router.get('/module-menu-functionality/:module_menu_functionality_id', PositionController.getByModuleMenuFunctionalityId);

router.post('/', PositionController.create);

router.delete('/:id', PositionController.delete);

router.put('/:id', PositionController.update);

module.exports = router;