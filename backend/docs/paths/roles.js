/**
 * @openapi
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Role]
 *     responses:
 *       200:
 *         description: List of all roles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 roles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Role'
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
 *                 value: { "message": "relation \"roles\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 *   post:
 *     summary: Create a new role
 *     tags: [Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - additional
 *               - company_id       
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Staff"
 *               additional:
 *                 type: object
 *                 example: {"info":"info about role"}
 *               company_id:
 *                 type: string
 *                 example: "1"
 *     responses:
 *       201:
 *         description: Role created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 newRole:
 *                   $ref: '#/components/schemas/Role'
 *             example:
 *               message: "Role created"
 *               newRole:
 *                 id: "1"
 *                 name: "Staff"
 *                 additional: {"info":"info about role"}
 *                 company_id: "1"
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
 *                 value: { "message": "relation \"roles\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 * /api/roles/company/{company_id}:
 *   get:
 *     summary: Get role by company ID
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: company_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of Role by Company Id
 *         content:
 *           application/json:
  *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 company:
 *                   $ref: '#/components/schemas/Company'
 *                 roles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Role'
 *       404:
 *         description: Company not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Company not found"
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
 *                 value: { "message": "relation \"roles\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 * 
 * /api/roles/{id}:
 *   get:
 *     summary: Get role by ID
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 role:
 *                   $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Role not found"
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
 *                 value: { "message": "relation \"roles\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 *   put:
 *     summary: Update role by ID
 *     tags: [Role]
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
 *                 example: "Updated role Name"
 *     responses:
 *       200:
 *         description: Role updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedRole:
 *                   $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Role not found"
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
 *                 value: { "message": "relation \"roles\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 *   delete:
 *     summary: Delete role by ID
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: i
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 deletedRole:
 *                   $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Role not found"
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
 *                 value: { "message": "relation \"roles\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 * 
 */