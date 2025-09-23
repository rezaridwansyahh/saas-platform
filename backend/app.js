const express = require('express');
const cors = require('cors');
const client = require('prom-client'); 

const app = express();

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

// Metrics collection setup
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

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
app.use(tenantMiddleware); // Apply tenant middleware to all routes

app.use(express.json());

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

app.use('/api/departments-positions', departmentsPositions);
app.use('/api/employees-departments', employeesDepartments);
app.use('/api/modules-companies', modulesCompanies);
app.use('/api/modules-departments', modulesDepartments);
app.use('/api/modules-menus', modulesMenus);
app.use('/api/positions-menus-functionalities', positionsMenusFunctionalities);
app.use('/api/users-positions', usersPositions);

module.exports = app;