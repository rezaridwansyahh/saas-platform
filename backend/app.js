const express = require('express');
const app = express();
const cors = require('cors');
const companyRoutes = require('./routes/companiesRoute.js');

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.use('/api/companies', companyRoutes);

module.exports = app;
