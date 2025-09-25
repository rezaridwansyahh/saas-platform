/**
 * @openapi
 * /api/modules-menus:
 *   get:
 *     summary: Get all modules-menus mapping
 *     tags: [ModuleMenu]
 *     responses:
 *       200:
 *         description: List all Modules-Menus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 modulesMenus:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       module_id:
 *                         type: integer
 *                       menu_id:
 *                         type: integer
 *             example:
 *               message: "List all Modules-Menus"
 *               modulesMenus:
 *                 - id: 1
 *                   module_id: 1
 *                   menu_id: 1
 *                 - id: 2
 *                   module_id: 2
 *                   menu_id: 2
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
 *     summary: Create module-menus mapping
 *     tags: [ModuleMenu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - module_id
 *               - menu_id
 *             properties:
 *               module_id:
 *                 type: integer
 *                 example: 1
 *               menu_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Module assigned to Menu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 moduleMenu:
 *                   $ref: '#/components/schemas/ModuleMenu'
 *             example:
 *               message: "Module assigned to Menu"
 *               moduleMenu:
 *                 id: 1
 *                 module_id: 1
 *                 menu_id: 1
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
 * /api/modules-menus/{id}:
 *   get:
 *     summary: Get modules-menus mapping by Id
 *     tags: [ModuleMenu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the module-menu mapping to get
 *     responses:
 *       200:
 *        description: List Module-Menu by Id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                moduleMenu:
 *                  $ref: '#/components/schemas/ModuleMenu'
 *            example:
 *              message: "List Module-Menu by Id"
 *              moduleMenu:
 *                -  id: 1
 *                   module_id: 1
 *                   menu_id: 1
 *                -  id: 2
 *                   module_id: 2
 *                   menu_id: 2
 *       404:
 *         description: Module-Menu not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Module-Menu not found"
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
 *     summary: Delete module-menu mapping by Id
 *     tags: [ModuleMenu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the module-menu mapping to delete
 *     responses:
 *       200:
 *         description: Module-Menu removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Menu removed from Module"
 *               moduleMenu:
 *                 id: 1
 *                 module_id: 1
 *                 menu_id: 1
 *       404:
 *         description: Module-Menu not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Module-Menu not found"
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
 * /api/modules-menus/details:
 *   get:
 *     summary: Get all modules-menus mapping with details
 *     tags: [ModuleMenu]
 *     responses:
 *       200:
 *         description: List all Modules-Menus with details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 modulesMenus:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       module_id:
 *                         type: integer
 *                       menu_id:
 *                         type: integer
 *                       module_name:
 *                         type: string
 *                       menu_name:
 *                         type: string
 *             example:
 *               message: "List all Modules-Menus with details"
 *               modulesMenus:
 *                 - id: 1
 *                   module_id: 2
 *                   menu_id: 101
 *                   module_name: "Engineering"
 *                   menu_name: "Menu Engineering"
 *                 - id: 2
 *                   module_id: 2
 *                   menu_id: 102
 *                   module_name: "Marketing"
 *                   menu_name: "Menu Marketing"
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
 * /api/modules-menus/module/{module_id}:
 *   get:
 *     summary: Get modules-menus mapping by Module Id
 *     tags: [ModuleMenu]
 *     parameters:
 *       - in: path
 *         name: module_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the module to get mappings for
 *     responses:
 *       200:
 *        description: List of Modules-Menus by Module Id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                module:
 *                  $ref: '#/components/schemas/Module'
 *                menu:
 *                  $ref: '#/components/schemas/Menu'
 *            example:
 *              message: "List of Module-Menus by Module"
 *              module:
 *                id: "1"
 *                name: "Employee Management"
 *              moduleMenus:
 *                - id: 1
 *                  module_id: 1
 *                  menu_id: 112
 *                - id: 2
 *                  module_id: 1
 *                  menu_id: 113
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
 * /api/modules-menus/menu/{menu_id}:
 *   get:
 *     summary: Get modules-menus mapping by Company Id
 *     tags: [ModuleMenu]
 *     parameters:
 *       - in: path
 *         name: menu_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the menu to get mappings for
 *     responses:
 *       200:
 *        description: List of Modules-Menus by Menu Id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                module:
 *                  $ref: '#/components/schemas/Module'
 *                menu:
 *                  $ref: '#/components/schemas/Menu'
 *            example:
 *              message: "List of Modules-Menu by Menu Id"
 *              menu:
 *                id: 112
 *                name: "Menu Engineering"
 *              modulesMenu:
 *                - id: 4
 *                  module_id: 2
 *                  menu_id: 1
 *                - id: 8
 *                  module_id: 3
 *                  menu_id: 1
 *       404:
 *         description: Menu Not Found
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
 * /api/modules-menus/module/{module_id}/menu/{menu_id}:
 *   get:
 *     summary: Get module-menu mapping by Module Id and Menu Id
 *     tags: [ModuleMenu]
 *     parameters:
 *       - in: path
 *         name: module_id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Numeric Id of the Module
 *       - in: path
 *         name: menu_id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Numeric Id of the Menu
 *     responses:
 *       200:
 *         description: List of Module-Menu by Module and Menu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                 module:
 *                   $ref: '#/components/schemas/Module'
 *                 menu:
 *                   $ref: '#/components/schemas/Menu'
 *                 moduleMenu:
 *                   $ref: '#/components/schemas/ModuleMenu'
 *             example:
 *               message: "List of Module-Menu by Module and Menu"
 *               module:
 *                 id: "1"
 *                 name: "Employee Management"
 *               menu:
 *                 id: 113
 *                 name: "Menu Engineering"
 *               moduleMenu:
 *                 - id: 4
 *                   module_id: 1
 *                   menu_id: 113
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
 *               menu_not_found:
 *                 summary: Menu  not found
 *                 value:
 *                   message: "Menu not found"
 *               module_menu_not_found:
 *                 summary: Module-Menu not found
 *                 value:
 *                   message: "Module-Menu not found"
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