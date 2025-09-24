const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController.js');
const authToken = require('../middlewares/authMiddleware.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - employee_id
 *         - position_id
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: User ID
 *         employee_id:
 *           type: integer
 *           description: Employee ID
 *         position_id:
 *           type: integer
 *           description: Position ID
 *         name:
 *           type: string
 *           description: User's full name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 1
 *         employee_id: 12345
 *         position_id: 5
 *         name: John Doe
 *         email: john.doe@company.com
 *         created_at: 2023-01-01T00:00:00Z
 *         updated_at: 2023-01-01T00:00:00Z
 *     
 *     CreateUser:
 *       type: object
 *       required:
 *         - employee_id
 *         - position_id
 *         - name
 *         - email
 *       properties:
 *         employee_id:
 *           type: integer
 *         position_id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *       example:
 *         employee_id: 12345
 *         position_id: 5
 *         name: John Doe
 *         email: john.doe@company.com
 *   
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   
 *   responses:
 *     UnauthorizedError:
 *       description: Access token is missing or invalid
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: "Unauthorized"
 *     
 *     NotFoundError:
 *       description: Resource not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: "User not found"
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints (All endpoints require authentication)
 */

router.use(authToken); // Apply authToken middleware to all routes in this file

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: X-Tenant-ID
 *         in: header
 *         required: false
 *         schema:
 *           type: string
 *         description: Tenant identifier (set automatically by proxy)
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Internal server error
 */
router.get('/', UserController.getAll);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *       - name: X-Tenant-ID
 *         in: header
 *         required: false
 *         schema:
 *           type: string
 *         description: Tenant identifier
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/:id', UserController.getById);

/**
 * @swagger
 * /api/users/employee/{employee_id}:
 *   get:
 *     summary: Get user by employee ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: employee_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *       - name: X-Tenant-ID
 *         in: header
 *         required: false
 *         schema:
 *           type: string
 *         description: Tenant identifier
 *     responses:
 *       200:
 *         description: User found by employee ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/employee/:employee_id', UserController.getByEmployeeId);

/**
 * @swagger
 * /api/users/position/{position_id}:
 *   get:
 *     summary: Get users by position ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: position_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Position ID
 *       - name: X-Tenant-ID
 *         in: header
 *         required: false
 *         schema:
 *           type: string
 *         description: Tenant identifier
 *     responses:
 *       200:
 *         description: Users found by position ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: No users found for this position
 */
router.get('/position/:position_id', UserController.getByPositionId);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: X-Tenant-ID
 *         in: header
 *         required: false
 *         schema:
 *           type: string
 *         description: Tenant identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required fields"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       409:
 *         description: User already exists (duplicate employee_id or email)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User with this employee ID already exists"
 */
router.post('/', UserController.create);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *       - name: X-Tenant-ID
 *         in: header
 *         required: false
 *         schema:
 *           type: string
 *         description: Tenant identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: integer
 *               position_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *             example:
 *               name: John Doe Updated
 *               email: john.doe.updated@company.com
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input data
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       409:
 *         description: Conflict - duplicate email or employee_id
 */
router.put('/:id', UserController.update);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *       - name: X-Tenant-ID
 *         in: header
 *         required: false
 *         schema:
 *           type: string
 *         description: Tenant identifier
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       409:
 *         description: Cannot delete user (may have dependencies)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Cannot delete user with active dependencies"
 */
router.delete('/:id', UserController.delete);

module.exports = router;