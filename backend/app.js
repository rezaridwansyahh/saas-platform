const express = require('express');
const app = express();
const cors = require('cors');
const companyRoutes = require('./routes/companiesRoute.js');
const usersRoute = require('./routes/usersRoute.js');
const authRoutes = require('./routes/authRoute.js');
const tenantRoute = require('./routes/tenantRoute.js');
const employeeRoutes = require('./routes/EmployeesRoute.js');
const tenantMiddleware = require('./middlewares/tenantMiddleware.js');

// Enable CORS for all routes
app.use(cors());
app.use(tenantMiddleware); // Apply tenant middleware to all routes

app.use(express.json());

app.use('/api/companies', companyRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api', authRoutes);
app.use('/api/users', usersRoute);
app.use('/api', tenantRoute);

module.exports = app;
