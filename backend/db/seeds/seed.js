const db = require('../../db/connection.js');
const companiesData = require('../data/development-data/companies.js');
const employeesData = require('../data/development-data/employees.js');
const positionsData = require('../data/development-data/positions.js')
const usersData = require('../data/development-data/users.js');
const modulesData = require('../data/development-data/modules.js');
const menusData = require('../data/development-data/menus.js');

const seed = async () => {
  await db.query("BEGIN");

  try {
    await db.query("DELETE FROM companies");
    await db.query("DELETE FROM positions");

    const insertedCompanies = [];
    for (const company of companiesData) {
      const result = await db.query(
        "INSERT INTO companies (company_id, name, logo, tier, tenant_name, theme) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [company.company_id, company.name, company.logo, company.tier, company.tenant_name, company.theme]
      );
      insertedCompanies.push(result.rows[0]);
    }

    const insertedPositions = [];
    for (const position of positionsData) {
      const result = await db.query(
        "INSERT INTO positions (position_id, name, additional, company_id) VALUES ($1, $2, $3, $4) RETURNING *", [position.position_id, position.name, position.additional, position.company_id]
      );
      insertedPositions.push(result.rows[0]);
    }

    const insertedEmployees = [];
    for (const employee of employeesData) {
      const result = await db.query(
        "INSERT INTO employees (employee_id, name, profile_picture, company_id, position_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [employee.employee_id, employee.name, employee.profile_picture, employee.company_id, employee.position_id]
      );
      insertedEmployees.push(result.rows[0]);
    }
    
    for (const user of usersData) {
      await db.query(
        "INSERT INTO users (user_id, email, password, employee_id) VALUES ($1, $2, $3, $4)",
        [user.user_id, user.email, user.password, user.employee_id]
      );
    }
    const insertedModules = [];
    for (const module of modulesData) {
      const result = await db.query(
        "INSERT INTO modules (id, name, company_id) VALUES ($1, $2, $3) RETURNING *",
        [module.id, module.name, module.company_id]
      );
      insertedModules.push(result.rows[0]);
    }
    const insertedmenus = [];
    for (const menu of menusData) {
      const result = await db.query(
        "INSERT INTO menus (id, name, module_id) VALUES ($1, $2, $3) RETURNING *",
        [menu.id, menu.name, menu.module_id]
      );
      insertedmenus.push(result.rows[0]);
    }



    await db.query('COMMIT');

  } catch (err) {

    await db.query('ROLLBACK');
    console.error('Seeding failed:', err.message);
    throw err;
  }
}

module.exports = seed;