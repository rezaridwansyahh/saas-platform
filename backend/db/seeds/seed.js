const db = require('../../db/connection.js');
const companyData = require('../data/development-data/companies.js');
const employeeData = require('../data/development-data/employees.js');
const userData = require('../data/development-data/users.js');

const seed = async () => {
  await db.query("BEGIN");

  try {
    await db.query("DELETE from companies");

    const 
  }
}