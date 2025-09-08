const express = require('express');
const router = express.Router();

const UsersRolesController = require('../controllers/usersRolesController.js');

const authMiddleware = require('../middlewares/authMiddleware.js');
const tenantMiddleware = require('../middlewares/tenantMiddleware.js');

router.use(tenantMiddleware);
router.use(authMiddleware);

router.get('/user/:userId/roles', UsersRolesController.fetchRolesByUserId);
router.get('/role/:roleId/users', UsersRolesController.fetchUsersByRoleId);

router.post('/assign', UsersRolesController.assignRoleToUser);

router.delete('/remove', UsersRolesController.removeRoleFromUser);

module.exports = router;