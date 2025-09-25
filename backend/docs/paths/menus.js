/**
 * @openapi
 * /api/menus:
 *   get:
 *     summary: Get all menus
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: List of all Menus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 menus:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Menu'
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
 *                 value: { "message": "relation \"menus\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 *   post:
 *     summary: Create a new menu
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - module_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "User Management"
 *               module_id:
 *                 type: string
 *                 example: "1"
 *     responses:
 *       201:
 *         description: Menu created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 newMenu:
 *                   $ref: '#/components/schemas/Menu'
 *             example:
 *               message: "Menu created"
 *               newMenu:
 *                 id: "123"
 *                 name: "User Management"
 *                 module_id: "1"
 *       400:
 *         description: module_id is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "module_id is required"
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
 *                 value: { "message": "relation \"menus\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 * /api/menus/module/{module_id}:
 *   get:
 *     summary: Get menus by module ID
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: module_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of Menus by Module Id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 module:
 *                   $ref: '#/components/schemas/Module'
 *                 menus:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Menu'
 *       404:
 *         description: Module not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Module not found"
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
 *                 value: { "message": "relation \"menus\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 * /api/menus/{id}:
 *   get:
 *     summary: Get menu by ID
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 menu:
 *                   $ref: '#/components/schemas/Menu'
 *       404:
 *         description: Menu not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Menu not found"
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
 *                 value: { "message": "relation \"menus\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 *   put:
 *     summary: Update menu by ID
 *     tags: [Menu]
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
 *               name:
 *                 type: string
 *                 example: "Updated Menu Name"
 *     responses:
 *       200:
 *         description: Menu updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedMenu:
 *                   $ref: '#/components/schemas/Menu'
 *       404:
 *         description: Menu not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Menu not found"
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
 *                 value: { "message": "relation \"menus\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 *   delete:
 *     summary: Delete menu by ID
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 deletedMenu:
 *                   $ref: '#/components/schemas/Menu'
 *       404:
 *         description: Menu not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Menu not found"
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
 *                 value: { "message": "relation \"menus\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 * 
 */