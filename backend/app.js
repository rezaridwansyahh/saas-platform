const express = require('express');
const cors = require('cors');
const app = express();

const companyRoutes = require('./routes/companiesRoute.js');
const usersRoute = require('./routes/usersRoute.js');
const authRoutes = require('./routes/authRoute.js');
const tenantRoute = require('./routes/tenantRoute.js');
const employeeRoutes = require('./routes/employeesRoute.js');
const imagesRoute = require('./routes/imagesRoute.js');

const tenantMiddleware = require('./middlewares/tenantMiddleware.js');
const { register, httpRequestCounter } = require('./middlewares/metrics.js');

// Enable CORS for all routes
app.use(cors());
// app.use(tenantMiddleware);
app.use(express.json());

// Collect metrics for every request
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.labels(req.method, req.route?.path || req.path, res.statusCode.toString()).inc();
  });
  next();
});

// API routes
app.use('/api/companies', companyRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api', authRoutes);
app.use('/api/users', usersRoute);
app.use('/api/tenant', tenantRoute);
app.use('/api/images', imagesRoute);

// 🔹 /metrics endpoint for Prometheus
app.get(['/api/metrics', '/metrics'], async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

module.exports = app;
