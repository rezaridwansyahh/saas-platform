/**
 * @openapi
 * /api/users-positions:
 *   get:
 *     summary: Get all users-positions mapping
 *     tags: [UserPosition]
 *     responses:
 *       200:
 *         description: List all Users-Positions with details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 usersPositions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       user_id:
 *                         type: integer
 *                       position_id:
 *                         type: integer
 *             example:
 *               message: "List all Users-Positions"
 *               usersPositions:
 *                 - id: 1
 *                   user_id: 1
 *                   position_id: 101
 *                 - id: 2
 *                   user_id: 2
 *                   position_id: 102
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
 *     summary: Create user-position mapping
 *     tags: [UserPosition]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - position_id
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               position_id:
 *                 type: integer
 *                 example: 101
 *     responses:
 *       201:
 *         description: User assigned to position
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userPosition:
 *                   $ref: '#/components/schemas/UserPosition'
 *             example:
 *               message: "User assigned to position"
 *               userPosition:
 *                 id: 1
 *                 user_id: 1
 *                 position_id: 101
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
 * /api/users-positions/{id}:
 *   get:
 *     summary: Get users-positions mapping by Id
 *     tags: [UserPosition]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the user-position mapping to get
 *     responses:
 *       200:
 *        description: List User-Position by Id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                userPosition:
 *                  $ref: '#/components/schemas/UserPosition'
 *            example:
 *              message: "List User-Position by Id"
 *              userPosition:
 *                -  id: 1
 *                   user_id: 1
 *                   position_id: 101
 *                -  id: 2
 *                   user_id: 2
 *                   position_id: 102
 *       404:
 *         description: User-Position not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "User-Position not found"
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
 *     summary: Delete user-position mapping by Id
 *     tags: [UserPosition]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the user-position mapping to delete
 *     responses:
 *       200:
 *         description: User removed from position
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "User removed from position"
 *               userPosition:
 *                 id: 1
 *                 user_id: 1
 *                 position_id: 101
 *       404:
 *         description: User-Position not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "User-Position not found"
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
 * /api/users-positions/details:
 *   get:
 *     summary: Get all users-positions mapping with details
 *     tags: [UserPosition]
 *     responses:
 *       200:
 *         description: List all Users-Positions with details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 usersPositions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       user_id:
 *                         type: integer
 *                       position_id:
 *                         type: integer
 *                       user_email:
 *                         type: string
 *                       position_name:
 *                         type: string
 *             example:
 *               message: "List all Users-Positions with details"
 *               usersPositions:
 *                 - id: 1
 *                   user_id: 2
 *                   position_id: 101
 *                   position_name: "Engineering"
 *                   user_email: "john.doe@example.com"
 *                 - id: 2
 *                   user_id: 2
 *                   position_id: 102
 *                   position_name: "Marketing"
 *                   user_email: "jane.smith@example.com"
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
 * /api/users-positions/user/{user_id}:
 *   get:
 *     summary: Get users-positions mapping by User Id
 *     tags: [UserPosition]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the user to get mappings for
 *     responses:
 *       200:
 *        description: List of Users-Positions by User
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                user:
 *                  $ref: '#/components/schemas/User'
 *                userPositions:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/UserPosition'
 *            example:
 *              message: "List of Users-Positions by User"
 *              user:
 *                id: 1
 *                password: "the password is hidden"
 *                email: "john.doe@example.com"
 *                employee_id: 1
 *              userPositions:
 *                - id: 1
 *                  user_id: 2
 *                  position_id: 102
 *                - id: 2
 *                  user_id: 2
 *                  position_id: 102
 *       404:
 *         description: User Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "User Not Found"
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
 * /api/users-positions/position/{position_id}:
 *   get:
 *     summary: Get users-positions mapping by Position Id
 *     tags: [UserPosition]
 *     parameters:
 *       - in: path
 *         name: position_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the position to get mappings for
 *     responses:
 *       200:
 *        description: List of Users-Positions by Position
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                position:
 *                  $ref: '#/components/schemas/Position'
 *                userPositions:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/UserPosition'
 *            example:
 *              message: "List of Users-Positions by Position"
 *              position:
 *                id: 101
 *                name: "Software Engineer"
 *                company_id: 1
 *              usersPosition:
 *                - id: 4
 *                  user_id: 1
 *                  position_id: 102
 *                - id: 8
 *                  user_id: 1
 *                  position_id: 105
 *                - id: 15
 *                  user_id: 1
 *                  position_id: 108
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
 * /api/users-positions/user/{user_id}/position/{position_id}:
 *   get:
 *     summary: Get user-position mapping by User Id and Position Id
 *     tags: [UserPosition]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Numeric Id of the User
 *       - in: path
 *         name: position_id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Numeric Id of the Position
 *     responses:
 *       200:
 *         description: List of User-Position by User and Position
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 position:
 *                   $ref: '#/components/schemas/Position'
 *                 userPosition:
 *                   $ref: '#/components/schemas/UserPosition'
 *             example:
 *               message: "List of User-Position by User and Position"
 *               user:
 *                 id: 1
 *                 password: "the password is hidden"
 *                 email: "john.doe@example.com"
 *                 employee_id: 1
 *               position:
 *                 id: 102
 *                 name: "Software Engineer"
 *                 company_id: 1
 *               userPosition:
 *                 id: 1
 *                 user_id: 1
 *                 position_id: 102
 *       404:
 *         description: Resource not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               user_not_found:
 *                 summary: User not found
 *                 value:
 *                   message: "User not found"
 *               position_not_found:
 *                 summary: Position not found
 *                 value:
 *                   message: "Position not found"
 *               user_position_not_found:
 *                 summary: User-Position not found
 *                 value:
 *                   message: "User-Position not found"
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