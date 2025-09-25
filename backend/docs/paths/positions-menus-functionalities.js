/**
 * @openapi
 * /api/positions-menus-functionalities:
 *   get:
 *     summary: Get all position-menu-functionalities
 *     tags: [PositionMenuFunctionality]
 *     responses:
 *       200:
 *         description: positions_menus_functionalities fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 functionality:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PositionMenuFunctionality'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               database_connection_error:
 *                 summary: Database connection failed
 *                 value: { "message": "connect ECONNREFUSED 127.0.0.1:5432" }
 *               database_query_error:
 *                 summary: Database query failed
 *                 value: { "message": "relation \"positions_menus_functionalities\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 *   post:
 *     summary: Create a new position-menu-functionality
 *     tags: [PositionMenuFunctionality]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role_id
 *               - module_menu_id
 *               - functionality
 *             properties:
 *               role_id:
 *                 type: string
 *                 example: "1"
 *               module_menu_id:
 *                 type: string
 *                 example: "1"
 *               functionality:
 *                 type: string
 *                 example: "read"
 *               additional:
 *                 type: object
 *                 example: { "info": "info about functionality" }
 *     responses:
 *       201:
 *         description: positions_menus_functionalities has been created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 newFunctionality:
 *                   $ref: '#/components/schemas/PositionMenuFunctionality'
 *             example:
 *               message: "positions_menus_functionalities has been created successfully"
 *               newFunctionality:
 *                 id: "123"
 *                 role_id: "1"
 *                 module_menu_id: "1"
 *                 functionality: "read"
 *                 additional: { "info": "info about functionality" }
 *       400:
 *         description: Required fields missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "role_id, module_menu_id and functionality are required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               database_connection_error:
 *                 summary: Database connection failed
 *                 value: { "message": "connect ECONNREFUSED 127.0.0.1:5432" }
 *               database_query_error:
 *                 summary: Database query failed
 *                 value: { "message": "relation \"positions_menus_functionalities\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 * /api/positions-menus-functionalities/position/{position_id}:
 *   get:
 *     summary: Get position-menu-functionalities by position ID
 *     tags: [PositionMenuFunctionality]
 *     parameters:
 *       - in: path
 *         name: position_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: position_id fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 functionality:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PositionMenuFunctionality'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               database_connection_error:
 *                 summary: Database connection failed
 *                 value: { "message": "connect ECONNREFUSED 127.0.0.1:5432" }
 *               database_query_error:
 *                 summary: Database query failed
 *                 value: { "message": "relation \"positions_menus_functionalities\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 * /api/positions-menus-functionalities/module-menu/{module_menu_id}:
 *   get:
 *     summary: Get position-menu-functionalities by module menu ID
 *     tags: [PositionMenuFunctionality]
 *     parameters:
 *       - in: path
 *         name: module_menu_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: module_menu_id fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 functionality:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PositionMenuFunctionality'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               database_connection_error:
 *                 summary: Database connection failed
 *                 value: { "message": "connect ECONNREFUSED 127.0.0.1:5432" }
 *               database_query_error:
 *                 summary: Database query failed
 *                 value: { "message": "relation \"positions_menus_functionalities\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 * /api/positions-menus-functionalities/position/{position_id}/module-menu/{module_menu_id}:
 *   get:
 *     summary: Get position-menu-functionalities by position ID and module menu ID
 *     tags: [PositionMenuFunctionality]
 *     parameters:
 *       - in: path
 *         name: position_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: module_menu_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: position_id and module_menu_id fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 functionality:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PositionMenuFunctionality'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               database_connection_error:
 *                 summary: Database connection failed
 *                 value: { "message": "connect ECONNREFUSED 127.0.0.1:5432" }
 *               database_query_error:
 *                 summary: Database query failed
 *                 value: { "message": "relation \"positions_menus_functionalities\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 * /api/positions-menus-functionalities/{id}:
 *   get:
 *     summary: Get position-menu-functionality by ID
 *     tags: [PositionMenuFunctionality]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: positions_menus_functionalities fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 functionality:
 *                   $ref: '#/components/schemas/PositionMenuFunctionality'
 *       404:
 *         description: Role Menu Functionality not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Role Menu Functionality not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               database_connection_error:
 *                 summary: Database connection failed
 *                 value: { "message": "connect ECONNREFUSED 127.0.0.1:5432" }
 *               database_query_error:
 *                 summary: Database query failed
 *                 value: { "message": "relation \"positions_menus_functionalities\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 *   put:
 *     summary: Update position-menu-functionality by ID
 *     tags: [PositionMenuFunctionality]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role_id:
 *                 type: string
 *                 example: "2"
 *               module_menu_id:
 *                 type: string
 *                 example: "2"
 *               functionality:
 *                 type: string
 *                 example: "read"
 *               additional:
 *                 type: object
 *                 example: { "info": "info about functionality" }
 *     responses:
 *       200:
 *         description: Position Menu Functionality has been updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updateFunctionality:
 *                   $ref: '#/components/schemas/PositionMenuFunctionality'
 *       404:
 *         description: Position Menu Functionality not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Position Menu Functionality not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               database_connection_error:
 *                 summary: Database connection failed
 *                 value: { "message": "connect ECONNREFUSED 127.0.0.1:5432" }
 *               database_query_error:
 *                 summary: Database query failed
 *                 value: { "message": "relation \"positions_menus_functionalities\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 *   delete:
 *     summary: Delete position-menu-functionality by ID
 *     tags: [PositionMenuFunctionality]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: positions_menus_functionalities has been deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 deletedFunctionality:
 *                   $ref: '#/components/schemas/PositionMenuFunctionality'
 *       404:
 *         description: Role Menu Functionality not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Role Menu Functionality not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               database_connection_error:
 *                 summary: Database connection failed
 *                 value: { "message": "connect ECONNREFUSED 127.0.0.1:5432" }
 *               database_query_error:
 *                 summary: Database query failed
 *                 value: { "message": "relation \"positions_menus_functionalities\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 * 
 */