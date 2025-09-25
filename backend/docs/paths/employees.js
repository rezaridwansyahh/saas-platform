/**
 * @openapi
 * /api/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: List all Employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 employees:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
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
 *                 value: { "message": "relation \"employees\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 *   post:
 *     summary: Create a new employee
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - position_id
 *               - profile_picture
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               position_id:
 *                 type: string
 *                 example: "1"
 *               profile_picture:
 *                 type: string
 *                 format: binary
 *                 description: Employee profile picture (JPEG format)
 *     responses:
 *       201:
 *         description: Employee created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 newEmployee:
 *                   $ref: '#/components/schemas/Employee'
 *             example:
 *               message: "Employee created"
 *               newEmployee:
 *                 id: "123"
 *                 name: "John Doe"
 *                 profile_picture: "assets/tenant_1/employees/employee_123.jpeg"
 *                 company_id: "1"
 *                 position_id: "1"
 *       403:
 *         description: Invalid position for this company
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Invalid position for this company"
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
 *                 value: { "message": "relation \"employees\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 * /api/employees/company/{company_id}:
 *   get:
 *     summary: Get employees by company ID
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: company_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of Employees inside this Company
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 employees:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *       404:
 *         description: No employees found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "No employees found"
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
 *                 value: { "message": "relation \"employees\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 * /api/employees/department/{department_id}:
 *   get:
 *     summary: Get employees by department ID
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: department_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of Employees inside this Department
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 department:
 *                   $ref: '#/components/schemas/Department'
 *                 employees:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Department not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Department not found"
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
 *                 value: { "message": "relation \"employees\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 * /api/employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 employee:
 *                   $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Employee not found"
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
 *                 value: { "message": "relation \"employees\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 *   put:
 *     summary: Update employee by ID
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Employee Name"
 *               position_id:
 *                 type: string
 *                 example: "2"
 *               profile_picture:
 *                 type: string
 *                 format: binary
 *                 description: Updated employee profile picture (JPEG format)
 *     responses:
 *       200:
 *         description: Employee updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedEmployee:
 *                   $ref: '#/components/schemas/Employee'
 *       403:
 *         description: You do not have permission to update this employee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "You do not have permission to update this employee"
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Employee not found"
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
 *                 value: { "message": "relation \"employees\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 *   delete:
 *     summary: Delete employee by ID
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 empoyee:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *             example:
 *               message: "Employee deleted"
 *               empoyee:
 *                 id: "1"
 *                 name: "John Doe"
 *       403:
 *         description: You do not have permission to delete this employee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "You do not have permission to delete this employee"
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Employee not found"
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
 *                 value: { "message": "relation \"employees\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 * 
 */