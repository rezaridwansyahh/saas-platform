/**
 * @openapi
 * /api/employees-departments:
 *   get:
 *     summary: Get all employees-departments mapping
 *     tags: [EmployeeDepartment]
 *     responses:
 *       200:
 *         description: List all Employees-Departments with details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 employeesDepartments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       employee_id:
 *                         type: integer
 *                       department_id:
 *                         type: integer
 *             example:
 *               message: "List all Employees-Departments"
 *               employeesDepartments:
 *                 - id: 1
 *                   employee_id: 1
 *                   department_id: 101
 *                 - id: 2
 *                   employee_id: 2
 *                   department_id: 102
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
 *     summary: Create employee-department mapping
 *     tags: [EmployeeDepartment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employee_id
 *               - department_id
 *             properties:
 *               employee_id:
 *                 type: integer
 *                 example: 1
 *               department_id:
 *                 type: integer
 *                 example: 101
 *     responses:
 *       201:
 *         description: Employee assigned to department
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 employeeDepartment:
 *                   $ref: '#/components/schemas/EmployeeDepartment'
 *             example:
 *               message: "Employee assigned to department"
 *               employeeDepartment:
 *                 id: 1
 *                 employee_id: 1
 *                 department_id: 101
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
 * /api/employees-departments/{id}:
 *   get:
 *     summary: Get employees-departments mapping by Id
 *     tags: [EmployeeDepartment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the employee-department mapping to get
 *     responses:
 *       200:
 *        description: List Employee-Department by Id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                employeeDepartment:
 *                  $ref: '#/components/schemas/EmployeeDepartment'
 *            example:
 *              message: "List Employee-Department by Id"
 *              employeeDepartment:
 *                -  id: 1
 *                   employee_id: 1
 *                   department_id: 101
 *                -  id: 2
 *                   employee_id: 2
 *                   department_id: 102
 *       404:
 *         description: Employee-Department not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Employee-Department not found"
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
 *     summary: Delete employee-department mapping by Id
 *     tags: [EmployeeDepartment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the employee-department mapping to delete
 *     responses:
 *       200:
 *         description: Employee removed from department
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Employee removed from department"
 *               employeeDepartment:
 *                 id: 1
 *                 employee_id: 1
 *                 department_id: 101
 *       404:
 *         description: Employee-Department not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Employee-Department not found"
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
 * /api/employees-departments/details:
 *   get:
 *     summary: Get all employees-departments mapping with details
 *     tags: [EmployeeDepartment]
 *     responses:
 *       200:
 *         description: List all Employees-Departments with details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 employeesDepartments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       employee_id:
 *                         type: integer
 *                       department_id:
 *                         type: integer
 *                       employee_name:
 *                         type: string
 *                       department_name:
 *                         type: string
 *             example:
 *               message: "List all Employees-Departments with details"
 *               employeesDepartments:
 *                 - id: 1
 *                   department_id: 101
 *                   employee_id: 2
 *                   department_name: "Engineering"
 *                   employee_name: "John Doe"
 *                 - id: 2
 *                   department_id: 102
 *                   employee_id: 2
 *                   department_name: "Marketing"
 *                   employee_name: "Jane Smith"
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
 * /api/employees-departments/employee/{employee_id}:
 *   get:
 *     summary: Get employees-departments mapping by Employee Id
 *     tags: [EmployeeDepartment]
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the employee to get mappings for
 *     responses:
 *       200:
 *        description: List of Employee-Departments by Employee
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                employee:
 *                  $ref: '#/components/schemas/Employee'
 *                employeeDepartments:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/EmployeeDepartment'
 *            example:
 *              message: "List of Employee-Departments by Employee"
 *              employee:
 *                id: 2
 *                name: "John Doe"
 *                profile_picture: "path/to/your/profile"
 *                position_id: 3
 *                company_id: 1
 *              employeeDepartments:
 *                - id: 1
 *                  employee_id: 2
 *                  department_id: 102
 *                - id: 2
 *                  employee_id: 2
 *                  department_id: 102
 *       404:
 *         description: Employee Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Employee Not Found"
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
 * /api/employees-departments/department/{department_id}:
 *   get:
 *     summary: Get employees-departments mapping by Department Id
 *     tags: [EmployeeDepartment]
 *     parameters:
 *       - in: path
 *         name: department_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the department to get mappings for
 *     responses:
 *       200:
 *        description: List of Employees-Departments by Department
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                employee:
 *                  $ref: '#/components/schemas/Employee'
 *                employeeDepartments:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/EmployeeDepartment'
 *            example:
 *              message: "List of Employees-Departments by Department"
 *              department:
 *                id: 101
 *                name: "Human Resource"
 *                company_id: 1
 *              employeeDepartments:
 *                - id: 4
 *                  employee_id: 3
 *                  department_id: 101
 *                - id: 8
 *                  employee_id: 5
 *                  department_id: 101
 *                - id: 15
 *                  employee_id: 7
 *                  department_id: 101
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
 * /api/employees-departments/{employee_id}/department/{department_id}:
 *   get:
 *     summary: Get employee-department mapping by Employee Id and Department Id
 *     tags: [EmployeeDepartment]
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Numeric Id of the Employee
 *       - in: path
 *         name: department_id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Numeric Id of the Department
 *     responses:
 *       200:
 *         description: List of Employee-Department by Employee and Department
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                 employee:
 *                   $ref: '#/components/schemas/Employee'
 *                 department:
 *                   $ref: '#/components/schemas/Department'
 *                 employeeDepartment:
 *                   $ref: '#/components/schemas/EmployeeDepartment'
 *             example:
 *               message: "List of Employee-Department by Employee and Department"
 *               employee:
 *                 id: 1
 *                 name: "John DOe"
 *                 profile_picture: "path/to/your/profile"
 *                 position_id: 3
 *                 company_id: 1
 *               department:
 *                 id: 101
 *                 name: "Human Resource"
 *                 company_id: 1
 *               employeeDepartment:
 *                 id: 1
 *                 employee_id: 1
 *                 department_id: 101
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
 *               employee_not_found:
 *                 summary: Employee not found
 *                 value:
 *                   message: "Employee not found"
 *               department_not_found:
 *                 summary: Department not found
 *                 value:
 *                   message: "Department not found"
 *               employee_department_not_found:
 *                 summary: Employee-Department not found
 *                 value:
 *                   message: "Employee-Department not found"
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