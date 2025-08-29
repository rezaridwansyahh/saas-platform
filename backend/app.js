const express = require('express');
const cors = require('cors');
const client = require('prom-client'); 

const app = express();

const companyRoutes = require('./routes/companiesRoute.js');
const usersRoute = require('./routes/usersRoute.js');
const authRoutes = require('./routes/authRoute.js');
const tenantRoute = require('./routes/tenantRoute.js');
const employeeRoutes = require('./routes/employeesRoute.js');
const imagesRoute = require('./routes/imagesRoute.js');
const positionsRoutes = require('./routes/positionsRoute.js');
const moduleRoutes = require('./routes/moduleRoute.js');
const menusRoute = require('./routes/menusRoute.js');
const rolesRoutes = require('./routes/rolesRoute.js');
const departmentsRoute = require('./routes/departmentsRoute.js');

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

app.use('/api/companies', companyRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api', authRoutes);
app.use('/api/users', usersRoute);
app.use('/api/tenant', tenantRoute);
app.use('/api/images', imagesRoute);
app.use('/api/positions', positionsRoutes);

module.exports = app;