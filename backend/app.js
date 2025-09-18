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
const moduleRoutes = require('./routes/module.js');
const menusRoute = require('./routes/menus.js');
const rolesRoutes = require('./routes/rolesRoute.js');
const departmentsRoute = require('./routes/departmentsRoute.js');
const moduleCompanyRoute = require('./routes/modules-companies.js');
const moduleDepartmentRoute = require('./routes/modules-departments.js');
const moduleMenuRoute = require('./routes/modules-menus.js');
const PositionMenuFunctionalityRoute = require('./routes/positions-menus-functionalities.js');


// const usersRoute = require('./routes/usersRoute.js');
const authRoutes = require('./routes/auths.js');
// const tenantRoute = require('./routes/tenantRoute.js');
// const imagesRoute = require('./routes/imagesRoute.js');
// const positionsRoutes = require('./routes/positionsRoute.js');
// const moduleRoutes = require('./routes/moduleRoute.js');
// const menusRoute = require('./routes/menusRoute.js');
// const rolesRoutes = require('./routes/rolesRoute.js');

// const usersRolesRoute = require('./routes/usersRolesRoute.js');
// const departmentsRolesRoute = require('./routes/departmentsRolesRoute.js');

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

app.use('/api/companies', companies);
// app.use('/api/departments-positions', departmentsPositions);
// app.use('/api/departments', departments);
// app.use('/api/employees-departments', employeesDepartments);
// app.use('/api/employees', employees);
app.use('/api', authRoutes);
// app.use('/api/users', usersRoute);
// app.use('/api/tenant', tenantRoute);
// app.use('/api/images', imagesRoute);
// app.use('/api/positions', positionsRoutes);

app.use('/api/modules', moduleRoutes);
app.use('/api/modules-company', moduleCompanyRoute);
app.use('/api/module-department', moduleDepartmentRoute);
app.use('/api/menus', menusRoute);
app.use('/api/module-menu', moduleMenuRoute);
app.use('/api/roles', rolesRoutes);
app.use('/api/departments', departmentsRoute);
app.use('/api/position-menu-functionality', PositionMenuFunctionalityRoute);

// app.use('/api/user-roles', usersRolesRoute);

module.exports = app;