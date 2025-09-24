const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const client = require('prom-client');
const app = express();

// Import all routes
const auths = require('./routes/auths.js');
const companies = require('./routes/companies.js');
const departmentsPositions = require('./routes/departments-positions.js');
const departments = require('./routes/departments.js');
const employeesDepartments = require('./routes/employees-departments.js');
const employees = require('./routes/employees.js');
const images = require('./routes/images.js');
const menus = require('./routes/menus.js');
const modulesCompanies = require('./routes/modules-companies.js');
const modulesDepartments = require('./routes/modules-departments.js');
const modulesMenus = require('./routes/modules-menus.js');
const modules = require('./routes/modules.js');
const positionsMenusFunctionalities = require('./routes/positions-menus-functionalities.js');
const positions = require('./routes/positions.js');
const roles = require('./routes/roles.js');
const tenants = require('./routes/tenants.js');
const usersPositions = require('./routes/users-positions.js');
const users = require('./routes/users.js');
const tenantMiddleware = require('./middlewares/tenantMiddleware.js');

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Multi-Tenant API',
      version: '1.0.0',
      description: `
        ## Enterprise Multi-Tenant API Documentation
        
        This API serves multiple tenants with identical functionality across various business modules.
        
        ### Key Features:
        - **Multi-tenant Architecture**: Each tenant's data is isolated and secure
        - **Authentication Required**: Most endpoints require JWT authentication
        - **Comprehensive Modules**: Users, Companies, Departments, Employees, Roles, and more
        - **Metrics & Monitoring**: Built-in Prometheus metrics at /metrics
        
        ### Tenant Context:
        - Tenant context is automatically determined from your domain
        - All operations are scoped to your specific tenant
        - Data isolation is handled transparently
        
        ### Authentication:
        - Use the /api/auth endpoints to obtain JWT tokens
        - Include the Bearer token in the Authorization header for protected endpoints
      `,
      contact: {
        name: 'API Support',
        email: 'api-support@company.com'
      }
    },
    servers: [
      {
        url: '/api',
        description: 'API Server (tenant context determined automatically)',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token obtained from /api/auth/login'
        }
      },
      parameters: {
        TenantId: {
          name: 'X-Tenant-ID',
          in: 'header',
          required: false,
          schema: { type: 'string' },
          description: 'Tenant identifier (automatically set by proxy based on domain)'
        },
        IdParam: {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
          description: 'Resource ID'
        },
        PageQuery: {
          name: 'page',
          in: 'query',
          schema: { type: 'integer', default: 1, minimum: 1 },
          description: 'Page number for pagination'
        },
        LimitQuery: {
          name: 'limit',
          in: 'query',
          schema: { type: 'integer', default: 10, minimum: 1, maximum: 100 },
          description: 'Number of items per page'
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Unauthorized - Invalid or missing token'
                  }
                }
              }
            }
          }
        },
        NotFoundError: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Resource not found'
                  }
                }
              }
            }
          }
        },
        ValidationError: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Validation failed'
                  },
                  details: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        },
        ServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Internal server error'
                  }
                }
              }
            }
          }
        }
      }
    },
    tags: [
      { name: 'Authentication', description: 'Login, logout, and token management' },
      { name: 'Users', description: 'User management' },
      { name: 'Companies', description: 'Company management' },
      { name: 'Departments', description: 'Department management' },
      { name: 'Employees', description: 'Employee management' },
      { name: 'Positions', description: 'Position/role management' },
      { name: 'Roles', description: 'Role and permissions management' },
      { name: 'Modules', description: 'System modules management' },
      { name: 'Menus', description: 'Menu and navigation management' },
      { name: 'Images', description: 'Image upload and management' },
      { name: 'Tenants', description: 'Tenant management (admin only)' },
      { name: 'Relationships', description: 'Entity relationship management' },
      { name: 'Monitoring', description: 'Metrics and monitoring endpoints' }
    ]
  },
  apis: [
    './routes/*.js',
    './app.js'
  ],
};

// Generate Swagger specification
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Metrics collection setup
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

// Middleware for metrics collection
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode,
    });
  });
  next();
});

/**
 * @swagger
 * /metrics:
 *   get:
 *     summary: Prometheus metrics endpoint
 *     description: Returns Prometheus-formatted metrics for monitoring
 *     tags: [Monitoring]
 *     responses:
 *       200:
 *         description: Prometheus metrics
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: |
 *                 # HELP http_requests_total Total number of HTTP requests
 *                 # TYPE http_requests_total counter
 *                 http_requests_total{method="GET",route="/api/users",status="200"} 1
 *       500:
 *         description: Error retrieving metrics
 */
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

// Enable CORS for all routes
app.use(cors());

// Apply tenant middleware to all routes
app.use(tenantMiddleware);

// Parse JSON bodies
app.use(express.json());

// Swagger UI middleware - serve static files first
app.use('/api/docs', swaggerUi.serve);

// Swagger UI with tenant-aware customization
app.get('/api/docs', (req, res, next) => {
  const tenant = req.tenant || req.get('X-Tenant-ID') || 'Unknown';
  
  const swaggerUiOptions = {
    customSiteTitle: `${tenant.toUpperCase()} - API Documentation`,
    customCss: `
      .swagger-ui .topbar { 
        background-color: #1f4e79; 
        padding: 15px 0;
      }
      .swagger-ui .topbar .download-url-wrapper { 
        display: none; 
      }
      .swagger-ui .topbar:before { 
        content: "🏢 ${tenant.toUpperCase()} API Documentation"; 
        color: white; 
        font-size: 1.5em; 
        font-weight: bold;
        margin-left: 20px;
      }
      .swagger-ui .info .title {
        color: #1f4e79;
      }
      .swagger-ui .scheme-container {
        background: #f8f9fa;
        padding: 15px;
        border-left: 4px solid #1f4e79;
        margin: 20px 0;
        border-radius: 4px;
      }
      .swagger-ui .scheme-container:before {
        content: "🎯 Current Tenant: ${tenant}";
        font-weight: bold;
        color: #1f4e79;
        display: block;
        margin-bottom: 8px;
        font-size: 1.1em;
      }
      .swagger-ui .btn.authorize {
        background-color: #1f4e79;
        border-color: #1f4e79;
      }
      .swagger-ui .btn.authorize:hover {
        background-color: #2d5aa0;
      }
    `,
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      defaultModelsExpandDepth: 2,
      defaultModelExpandDepth: 2,
      docExpansion: 'none',
      requestInterceptor: (request) => {
        // Ensure tenant header is present (though middleware should set it)
        if (!request.headers['X-Tenant-ID'] && tenant !== 'Unknown') {
          request.headers['X-Tenant-ID'] = tenant;
        }
        return request;
      }
    }
  };

  return swaggerUi.setup(swaggerSpec, swaggerUiOptions)(req, res);
});

// API Routes
app.use('/api', auths);
app.use('/api/companies', companies);
app.use('/api/departments', departments);
app.use('/api/employees', employees);
app.use('/api/images', images);
app.use('/api/menus', menus);
app.use('/api/modules', modules);
app.use('/api/positions', positions);
app.use('/api/roles', roles);
app.use('/api/tenants', tenants);
app.use('/api/users', users);

// Relationship routes
app.use('/api/departments-positions', departmentsPositions);
app.use('/api/employees-departments', employeesDepartments);
app.use('/api/modules-companies', modulesCompanies);
app.use('/api/modules-departments', modulesDepartments);
app.use('/api/modules-menus', modulesMenus);
app.use('/api/positions-menus-functionalities', positionsMenusFunctionalities);
app.use('/api/users-positions', usersPositions);

/**
 * @swagger
 * /:
 *   get:
 *     summary: API Health Check
 *     description: Simple health check endpoint
 *     tags: [Monitoring]
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "API is running"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 tenant:
 *                   type: string
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Multi-Tenant API is running',
    timestamp: new Date().toISOString(),
    tenant: req.tenant || 'Unknown',
    documentation: '/api/docs'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method,
    suggestion: 'Check /api/docs for available endpoints'
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

module.exports = app;