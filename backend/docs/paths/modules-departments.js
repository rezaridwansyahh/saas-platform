/**
 * @openapi
 * /api/modules-departments:
 *   get:
 *     summary: Get all modules-departments mapping
 *     tags: [ModuleDepartment]
 *     responses:
 *       200:
 *         description: List all Modules-Departments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 modulesDepartments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       module_id:
 *                         type: integer
 *                       department_id:
 *                         type: integer
 *             example:
 *               message: "List all Modules-Departments"
 *               modulesDepartments:
 *                 - id: 1
 *                   module_id: 1
 *                   department_id: 1
 *                 - id: 2
 *                   module_id: 2
 *                   department_id: 2
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
 *     summary: Create module-department mapping
 *     tags: [ModuleDepartment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - module_id
 *               - department_id
 *             properties:
 *               module_id:
 *                 type: integer
 *                 example: 1
 *               department_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Module assigned to Department
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 moduleDepartment:
 *                   $ref: '#/components/schemas/ModuleDepartment'
 *             example:
 *               message: "Module assigned to Department"
 *               moduleDepartment:
 *                 id: 1
 *                 module_id: 1
 *                 department_id: 1
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
 * /api/modules-departments/{id}:
 *   get:
 *     summary: Get module-department mapping by Id
 *     tags: [ModuleDepartment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the module-department mapping to get
 *     responses:
 *       200:
 *        description: List Module-Department by Id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                moduleDepartment:
 *                  $ref: '#/components/schemas/ModuleDepartment'
 *            example:
 *              message: "List Module-Department by Id"
 *              moduleDepartment:
 *                -  id: 1
 *                   module_id: 1
 *                   department_id: 1
 *                -  id: 2
 *                   module_id: 2
 *                   department_id: 2
 *       404:
 *         description: Module-Department not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Module-Department not found"
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
 *     summary: Delete module-department mapping by Id
 *     tags: [ModuleDepartment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the module-department mapping to delete
 *     responses:
 *       200:
 *         description: Module-Department removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Module removed from Department"
 *               moduleDepartment:
 *                 id: 1
 *                 module_id: 1
 *                 department_id: 1
 *       404:
 *         description: Module-Department not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Module-Department not found"
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
 * /api/modules-departments/details:
 *   get:
 *     summary: Get all modules-departments mapping with details
 *     tags: [ModuleDepartment]
 *     responses:
 *       200:
 *         description: List all Modules-Departments with details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 modulesDepartments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       module_id:
 *                         type: integer
 *                       department_id:
 *                         type: integer
 *                       module_name:
 *                         type: string
 *                       department_name:
 *                         type: string
 *             example:
 *               message: "List all Modules-Departments with details"
 *               modulesDepartments:
 *                 - id: 1
 *                   module_id: 2
 *                   department_id: 101
 *                   module_name: "Engineering"
 *                   department_name: "Software Development"
 *                 - id: 2
 *                   module_id: 2
 *                   department_id: 102
 *                   module_name: "Marketing"
 *                   department_name: "Digital Marketing"
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
 * /api/modules-departments/module/{module_id}:
 *   get:
 *     summary: Get modules-departments mapping by Module Id
 *     tags: [ModuleDepartment]
 *     parameters:
 *       - in: path
 *         name: module_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the module to get mappings for
 *     responses:
 *       200:
 *        description: List of Module-Departments by Module Id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                module:
 *                  $ref: '#/components/schemas/Module'
 *                department:
 *                  $ref: '#/components/schemas/Department'
 *            example:
 *              message: "List of Module-Departments by Module"
 *              module:
 *                id: "1"
 *                name: "Employee Management"
 *              moduleDepartments:
 *                - id: 1
 *                  module_id: 1
 *                  department_id: 12
 *                - id: 2
 *                  module_id: 1
 *                  department_id: 13
 *       404:
 *         description: Module Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Module Not Found"
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
 * /api/modules-departments/department/{department_id}:
 *   get:
 *     summary: Get modules-departments mapping by Department Id
 *     tags: [ModuleDepartment]
 *     parameters:
 *       - in: path
 *         name: department_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the department to get mappings for
 *     responses:
 *       200:
 *        description: List of Modules-Departments by Department Id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                module:
 *                  $ref: '#/components/schemas/Module'
 *                department:
 *                  $ref: '#/components/schemas/Department'
 *            example:
 *              message: "List of Modules-Department by Department Id"
 *              department:
 *                id: 12
 *                name: "Human Resource"
 *                company_id: 1
 *              modulesDepartment:
 *                - id: 4
 *                  module_id: 2
 *                  department_id: 1
 *                - id: 8
 *                  module_id: 3
 *                  department_id: 1
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
 * /api/modules-departments/module/{module_id}/department/{department_id}:
 *   get:
 *     summary: Get module-department mapping by Module Id and Department Id
 *     tags: [ModuleDepartment]
 *     parameters:
 *       - in: path
 *         name: module_id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Numeric Id of the Module
 *       - in: path
 *         name: department_id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Numeric Id of the Department
 *     responses:
 *       200:
 *         description: List of Module-Department by Module and Department
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                 module:
 *                   $ref: '#/components/schemas/Module'
 *                 department:
 *                   $ref: '#/components/schemas/Department'
 *                 moduleDepartment:
 *                   $ref: '#/components/schemas/ModuleDepartment'
 *             example:
 *               message: "List of Module-Department by Module and Department"
 *               module:
 *                 id: "1"
 *                 name: "Employee Management"
 *               department:
 *                 id: 12
 *                 name: "Human Resource"
 *                 company_id: 1
 *               moduleDepartment:
 *                 - id: 4
 *                   module_id: 1
 *                   department_id: 12
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
 *               module_not_found:
 *                 summary: Module not found
 *                 value:
 *                   message: "Module not found"
 *               department_not_found:
 *                 summary: Department not found
 *                 value:
 *                   message: "Department not found"
 *               module_department_not_found:
 *                 summary: Module-Department not found
 *                 value:
 *                   message: "Module-Department not found"
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