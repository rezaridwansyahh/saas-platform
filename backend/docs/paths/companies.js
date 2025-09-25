/**
 * @openapi
 * /api/companies:
 *   get:
 *     summary: Get all companies
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: List all Companies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 companies:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Company'
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
 *                 value: { "message": "relation \"companies\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 *   post:
 *     summary: Create a new company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - tenant_name
 *             properties:
 *               id:
 *                 type: string
 *                 example: "1"
 *               name:
 *                 type: string
 *                 example: "John Doe Corp"
 *               logo:
 *                 type: string
 *                 example: "path/to/your/logo"
 *               tier:
 *                 type: string
 *                 example: "pro"
 *               tenant_name:
 *                 type: string
 *                 example: "john_tenant"
 *               additional:
 *                 type: object
 *                 properties:
 *                   example:
 *                      type: json
 *                      info: "info about the company"
 *     responses:
 *       201:
 *         description: Company created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 company:
 *                   $ref: '#/components/schemas/Company'
 *             example:
 *               message: "Company created"
 *               company:
 *                 id: "123"
 *                 name: "TechCorp"
 *                 logo: "https://example.com/logo.png"
 *                 tier: "premium"
 *                 tenant_name: "techcorp_tenant"
 *                 additional: "Extra info here"
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
 *                 value: { "message": "relation \"companies\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 * /api/companies/{id}:
 *   get:
 *     summary: Get company by ID
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 company:
 *                   $ref: '#/components/schemas/Company'
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
 *                 value: { "message": "relation \"companies\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 *   put:
 *     summary: Update company by ID
 *     tags: [Company]
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
 *             required:
 *               - name
 *               - tenant_name
 *             properties:
 *               id:
 *                 type: string
 *                 example: "1"
 *               name:
 *                 type: string
 *                 example: "John Doe Corp"
 *               logo:
 *                 type: string
 *                 example: "path/to/your/logo"
 *               tier:
 *                 type: string
 *                 example: "pro"
 *               tenant_name:
 *                 type: string
 *                 example: "john_tenant"
 *               additional:
 *                 type: object
 *                 properties:
 *                   example:
 *                      type: json
 *                      info: "info about the company"
 *     responses:
 *       200:
 *         description: Company updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 company:
 *                   $ref: '#/components/schemas/Company'
 *       400:
 *         description: No fields provided for update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "No fields provided for update"
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
 *                 value: { "message": "relation \"companies\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 *
 *   delete:
 *     summary: Delete company by ID
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 company:
 *                   $ref: '#/components/schemas/Company'
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
 *                 value: { "message": "relation \"companies\" does not exist" }
 *               timeout_error:
 *                 summary: Database timeout
 *                 value: { "message": "Query timeout after 30000ms" }
 *               generic_error:
 *                 summary: Generic server error
 *                 value: { "message": "Internal server error occurred" }
 * 
 */
