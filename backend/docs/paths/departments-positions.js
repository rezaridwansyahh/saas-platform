/**
 * @openapi
 * /api/departments-positions:
 *   get:
 *     summary: Get all departments-positions mapping
 *     tags: [DepartmentPosition]
 *     responses:
 *       200:
 *         description: List all Departments-Positions with details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 departmentsPositions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       department_id:
 *                         type: integer
 *                       position_id:
 *                         type: integer
 *             example:
 *               message: "List all Departments-Positions"
 *               departmentsPositions:
 *                 - id: 1
 *                   department_id: 101
 *                   position_id: 201
 *                 - id: 2
 *                   department_id: 102
 *                   position_id: 202
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
 *                 value:
 *                   message: "connect ECONNREFUSED 127.0.0.1:5432"
 *               database_query_error:
 *                 summary: Database query failed
 *                 value:
 *                   message: "relation \"department_positions\" does not exist"
 *               timeout_error:
 *                 summary: Database timeout
 *                 value:
 *                   message: "Query timeout after 30000ms"
 *               generic_error:
 *                 summary: Generic server error
 *                 value:
 *                   message: "Internal server error occurred"
 *   post:
 *     summary: Create department-position mapping
 *     tags: [DepartmentPosition]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - department_id
 *               - position_id
 *             properties:
 *               department_id:
 *                 type: integer
 *                 example: 101
 *               position_id:
 *                 type: integer
 *                 example: 201
 *     responses:
 *       201:
 *         description: Position assigned to department
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 departmentPosition:
 *                   $ref: '#/components/schemas/DepartmentPosition'
 *             example:
 *               message: "Position assigned to department"
 *               departmentPosition:
 *                 id: 1
 *                 department_id: 101
 *                 position_id: 201
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
 *                 value:
 *                   message: "connect ECONNREFUSED 127.0.0.1:5432"
 *               database_query_error:
 *                 summary: Database query failed
 *                 value:
 *                   message: "relation \"department_positions\" does not exist"
 *               timeout_error:
 *                 summary: Database timeout
 *                 value:
 *                   message: "Query timeout after 30000ms"
 *               generic_error:
 *                 summary: Generic server error
 *                 value:
 *                   message: "Internal server error occurred"
 * 
 * /api/departments-positions/{id}:
 *   get:
 *     summary: Get deparments-positions mapping by Id
 *     tags: [DepartmentPosition]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the department-position mapping to get
 *     responses:
 *       200:
 *        description: List Department-Position by Id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                departmentPosition:
 *                  $ref: '#/components/schemas/DepartmentPosition'
 *            example:
 *              message: "List Department-Position by Id"
 *              departmentPosition:
 *                -  id: 1
 *                   department_id: 101
 *                   position_id: 201
 *                -  id: 2
 *                   department_id: 102
 *                   position_id: 202
 *       404:
 *         description: Department-Position not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Department-Position not found"
 *       500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *              examples:
 *                database_connection_error:
 *                  summary: Database connection failed
 *                  value:
 *                    message: "connect ECONNREFUSED 127.0.0.1:5432"
 *                database_query_error:
 *                  summary: Database query failed
 *                  value:
 *                    message: "relation \"department_positions\" does not exist"
 *                timeout_error:
 *                  summary: Database timeout
 *                  value:
 *                    message: "Query timeout after 30000ms"
 *                generic_error:
 *                  summary: Generic server error
 *                  value:
 *                    message: "Internal server error occurred"
 *   delete:
 *     summary: Delete departments-positions mapping by Id
 *     tags: [DepartmentPosition]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the department-position mapping to delete
 *     responses:
 *       200:
 *         description: Position removed from department
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Position removed from department"
 *               departmentPosition:
 *                 id: 1
 *                 department_id: 101
 *                 position_id: 201
 *       404:
 *         description: Department-Position not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Department-Position not found"
 *       500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *              examples:
 *                database_connection_error:
 *                  summary: Database connection failed
 *                  value:
 *                    message: "connect ECONNREFUSED 127.0.0.1:5432"
 *                database_query_error:
 *                  summary: Database query failed
 *                  value:
 *                    message: "relation \"department_positions\" does not exist"
 *                timeout_error:
 *                  summary: Database timeout
 *                  value:
 *                    message: "Query timeout after 30000ms"
 *                generic_error:
 *                  summary: Generic server error
 *                  value:
 *                    message: "Internal server error occurred"
 * 
 * /api/departments-positions/details:
 *   get:
 *     summary: Get all departments-positions mapping with details
 *     tags: [DepartmentPosition]
 *     responses:
 *       200:
 *         description: List all Departments-Positions with details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 departmentsPositions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       department_id:
 *                         type: integer
 *                       position_id:
 *                         type: integer
 *                       department_name:
 *                         type: string
 *                       position_name:
 *                         type: string
 *             example:
 *               message: "List all Departments-Positions with details"
 *               departmentsPositions:
 *                 - id: 1
 *                   department_id: 101
 *                   position_id: 201
 *                   department_name: "Engineering"
 *                   position_name: "Senior Developer"
 *                 - id: 2
 *                   department_id: 102
 *                   position_id: 202
 *                   department_name: "Marketing"
 *                   position_name: "Marketing Manager"
 *       500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *              examples:
 *                database_connection_error:
 *                  summary: Database connection failed
 *                  value:
 *                    message: "connect ECONNREFUSED 127.0.0.1:5432"
 *                database_query_error:
 *                  summary: Database query failed
 *                  value:
 *                    message: "relation \"department_positions\" does not exist"
 *                timeout_error:
 *                  summary: Database timeout
 *                  value:
 *                    message: "Query timeout after 30000ms"
 *                generic_error:
 *                  summary: Generic server error
 *                  value:
 *                    message: "Internal server error occurred"
 * 
 * /api/departments-positions/department/{department_id}:
 *   get:
 *     summary: Get departments-positions mapping by Department Id
 *     tags: [DepartmentPosition]
 *     parameters:
 *       - in: path
 *         name: department_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the department to get mappings for
 *     responses:
 *       200:
 *        description: List of Department-Positions by Department
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                department:
 *                  $ref: '#/components/schemas/Department'
 *                departmentPositions:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/DepartmentPosition'
 *            example:
 *              message: "List of Department-Positions by Department"
 *              department:
 *                id: 102
 *                name: "Human Resources"
 *                company_id: 1
 *              departmentPositions:
 *                - id: 1
 *                  department_id: 102
 *                  position_id: 201
 *                - id: 1
 *                  department_id: 102
 *                  position_id: 202
 *       404:
 *         description: Department Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Department Not Found"
 *       500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *              examples:
 *                database_connection_error:
 *                  summary: Database connection failed
 *                  value:
 *                    message: "connect ECONNREFUSED 127.0.0.1:5432"
 *                database_query_error:
 *                  summary: Database query failed
 *                  value:
 *                    message: "relation \"department_positions\" does not exist"
 *                timeout_error:
 *                  summary: Database timeout
 *                  value:
 *                    message: "Query timeout after 30000ms"
 *                generic_error:
 *                  summary: Generic server error
 *                  value:
 *                    message: "Internal server error occurred"
 * 
 * /api/departments-positions/position/{position_id}:
 *   get:
 *     summary: Get departments-positions mapping by Position Id
 *     tags: [DepartmentPosition]
 *     parameters:
 *       - in: path
 *         name: position_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the position to get mappings for
 *     responses:
 *       200:
 *        description: List of Departments-Positions by Position
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                position:
 *                  $ref: '#/components/schemas/Position'
 *                departmentPositions:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/DepartmentPosition'
 *            example:
 *              message: "List of Departments-Positions by Position"
 *              position:
 *                id: 201
 *                title: "Software Engineer"
 *              departmentPositions:
 *                - id: 1
 *                  department_id: 101
 *                  position_id: 201
 *                - id: 1
 *                  department_id: 102
 *                  position_id: 201
 *       404:
 *         description: Position Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Position Not Found"
 *       500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *              examples:
 *                database_connection_error:
 *                  summary: Database connection failed
 *                  value:
 *                    message: "connect ECONNREFUSED 127.0.0.1:5432"
 *                database_query_error:
 *                  summary: Database query failed
 *                  value:
 *                    message: "relation \"department_positions\" does not exist"
 *                timeout_error:
 *                  summary: Database timeout
 *                  value:
 *                    message: "Query timeout after 30000ms"
 *                generic_error:
 *                  summary: Generic server error
 *                  value:
 *                    message: "Internal server error occurred"
 * 
 * /api/department/{department_id}/position/{position_id}:
 *   get:
 *     summary: Get department-position by Department Id and Position Id
 *     tags: [DepartmentPosition]
 *     parameters:
 *       - in: path
 *         name: department_id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Numeric Id of the Department
 *       - in: path
 *         name: position_id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Numeric Id of the Position
 *     responses:
 *       200:
 *         description: List of Department-Position by Department and Position
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                 department:
 *                   $ref: '#/components/schemas/Department'
 *                 position:
 *                   $ref: '#/components/schemas/Position'
 *                 departmentPosition:
 *                   $ref: '#/components/schemas/DepartmentPosition'
 *             example:
 *               message: "List of Department-Position by Department and Position"
 *               department:
 *                 id: 101
 *                 name: "Engineering"
 *                 company_id: 1
 *               position:
 *                 id: 201
 *                 name: "Software Engineer"
 *               departmentPosition:
 *                 id: 1
 *                 department_id: 101
 *                 position_id: 201
 *       404:
 *         description: Department not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               department_not_found:
 *                 summary: Department not found
 *                 value:
 *                   message: "Department not found"
 *               position_not_found:
 *                 summary: Position not found
 *                 value:
 *                   message: "Position not found"
 *               department_position_not_found:
 *                 summary: Department-Position not found
 *                 value:
 *                   message: "Department-Position not found"
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
 *                 value:
 *                   message: "connect ECONNREFUSED 127.0.0.1:5432"
 *               database_query_error:
 *                 summary: Database query failed
 *                 value:
 *                   message: "relation \"department_positions\" does not exist"
 *               timeout_error:
 *                 summary: Database timeout
 *                 value:
 *                   message: "Query timeout after 30000ms"
 *               generic_error:
 *                 summary: Generic server error
 *                 value:
 *                   message: "Internal server error occurred"
 */