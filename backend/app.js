const express = require('express');
const app = express();
const cors = require('cors');
const companyRoutes = require('./routes/companiesRoute.js');
const usersRoute = require('./routes/usersRoute.js');
const authRoutes = require('./routes/authRoute.js');
const tenantsRoute = require('./routes/tenantsRoute.js')

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.use('/api/companies', companyRoutes);
app.use('/', authRoutes);
app.use('/api/users', usersRoute);
app.use('/tenat', tenantsRoute);


module.exports = app;
