/**
 * @openapi
 * /api/modules-companies:
 *   get:
 *     summary: Get all modules-companies mapping
 *     tags: [ModuleCompany]
 *     responses:
 *       200:
 *         description: List all Modules-Companies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 modulesCompanies:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       module_id:
 *                         type: integer
 *                       company_id:
 *                         type: integer
 *             example:
 *               message: "List all Modules-Companies"
 *               modulesCompanies:
 *                 - id: 1
 *                   module_id: 1
 *                   company_id: 1
 *                 - id: 2
 *                   module_id: 2
 *                   company_id: 2
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
 *     summary: Create module-company mapping
 *     tags: [ModuleCompany]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - module_id
 *               - company_id
 *             properties:
 *               module_id:
 *                 type: integer
 *                 example: 1
 *               company_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Module assigned to Company
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 moduleCompany:
 *                   $ref: '#/components/schemas/ModuleCompany'
 *             example:
 *               message: "Module assigned to Company"
 *               moduleCompany:
 *                 id: 1
 *                 module_id: 1
 *                 company_id: 1
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
 * /api/modules-companies/{id}:
 *   get:
 *     summary: Get modules-companies mapping by Id
 *     tags: [ModuleCompany]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the module-company mapping to get
 *     responses:
 *       200:
 *        description: List Module-Company by Id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                moduleCompany:
 *                  $ref: '#/components/schemas/ModuleCompany'
 *            example:
 *              message: "List Module-Company by Id"
 *              moduleCompany:
 *                -  id: 1
 *                   module_id: 1
 *                   company_id: 1
 *                -  id: 2
 *                   module_id: 2
 *                   company_id: 2
 *       404:
 *         description: Module-Company not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Module-Company not found"
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
 *     summary: Delete module-company mapping by Id
 *     tags: [ModuleCompany]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the module-company mapping to delete
 *     responses:
 *       200:
 *         description: Module-Company removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Module removed from Company"
 *               moduleCompany:
 *                 id: 1
 *                 module_id: 1
 *                 company_id: 1
 *       404:
 *         description: Module-Company not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Module-Company not found"
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
 * /api/modules-companies/details:
 *   get:
 *     summary: Get all modules-companies mapping with details
 *     tags: [ModuleCompany]
 *     responses:
 *       200:
 *         description: List all Modules-Companies with details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 modulesCompanies:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       module_id:
 *                         type: integer
 *                       company_id:
 *                         type: integer
 *                       module_name:
 *                         type: string
 *                       company_name:
 *                         type: string
 *             example:
 *               message: "List all Modules-Companies with details"
 *               modulesCompanies:
 *                 - id: 1
 *                   module_id: 2
 *                   company_id: 101
 *                   module_name: "Engineering"
 *                   company_name: "PT Abhimata Persada"
 *                 - id: 2
 *                   module_id: 2
 *                   company_id: 102
 *                   module_name: "Marketing"
 *                   company_name: "PT Optima Solusi Pratama"
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
 * /api/modules-companies/module/{module_id}:
 *   get:
 *     summary: Get modules-companies mapping by Module Id
 *     tags: [ModuleCompany]
 *     parameters:
 *       - in: path
 *         name: module_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the module to get mappings for
 *     responses:
 *       200:
 *        description: List of Modules-Companies by Module Id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                module:
 *                  $ref: '#/components/schemas/Module'
 *                company:
 *                  $ref: '#/components/schemas/Company'
 *            example:
 *              message: "List of Module-Companies by Module"
 *              module:
 *                id: "1"
 *                name: "Employee Management"
 *              moduleCompanies:
 *                - id: 1
 *                  module_id: 1
 *                  company_id: 101
 *                - id: 2
 *                  module_id: 1
 *                  company_id: 102
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
 * /api/modules-companies/company/{company_id}:
 *   get:
 *     summary: Get modules-companies mapping by Company Id
 *     tags: [ModuleCompany]
 *     parameters:
 *       - in: path
 *         name: company_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the company to get mappings for
 *     responses:
 *       200:
 *        description: List of Modules-Companies by Company Id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                module:
 *                  $ref: '#/components/schemas/Module'
 *                company:
 *                  $ref: '#/components/schemas/Company'
 *            example:
 *              message: "List of Modules-Company by Company Id"
 *              company:
 *                id: 101
 *                name: "PT Abhimata Persada"
 *                logo: "path/to/logo"
 *                tier: "pro"
 *                tenant_name: "ptap"
 *                additional: {}
 *                theme: "red"
 *              modulesCompany:
 *                - id: 4
 *                  module_id: 2
 *                  company_id: 1
 *                - id: 8
 *                  module_id: 3
 *                  company_id: 1
 *       404:
 *         description: Company Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Company Not Found"
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
 * /api/modules-companies/module/{module_id}/company/{company_id}:
 *   get:
 *     summary: Get module-company mapping by Module Id and Company Id
 *     tags: [ModuleCompany]
 *     parameters:
 *       - in: path
 *         name: module_id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Numeric Id of the Module
 *       - in: path
 *         name: company_id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Numeric Id of the Company
 *     responses:
 *       200:
 *         description: List of Module-Company by Module and Company
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                 module:
 *                   $ref: '#/components/schemas/Module'
 *                 company:
 *                   $ref: '#/components/schemas/Company'
 *                 moduleCompany:
 *                   $ref: '#/components/schemas/ModuleCompany'
 *             example:
 *               message: "List of Module-Company by Module and Company"
 *               module:
 *                 id: "1"
 *                 name: "Employee Management"
 *               company:
 *                 id: 101
 *                 name: "PT Abhimata Persada"
 *                 logo: "path/to/logo"
 *                 tier: "pro"
 *                 tenant_name: "ptap"
 *                 additional: {}
 *                 theme: "red"
 *               moduleCompany:
 *                 - id: 4
 *                   module_id: 1
 *                   company_id: 1
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
 *               company_not_found:
 *                 summary: Company not found
 *                 value:
 *                   message: "Company not found"
 *               module_company_not_found:
 *                 summary: Module-Company not found
 *                 value:
 *                   message: "Module-Company not found"
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