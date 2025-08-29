const db = require('../../db/connection.js');
const companiesData = require('../data/development-data/companies.js');
const employeesData = require('../data/development-data/employees.js');
const positionsData = require('../data/development-data/positions.js')
const usersData = require('../data/development-data/users.js');
const rolesData = require('../data/development-data/roles.js');
const departmentsData = require('../data/development-data/department.js');
const departmentRolesData = require('../data/development-data/department_roles.js'); // Add this import
const employeeDepartmentData = require('../data/development-data/employee_department.js');
const userRolesData = require('../data/development-data/user_roles.js');

const seed = async () => {
  await db.query("BEGIN");
  try {
    // Delete in correct order (reverse dependency order)
    await db.query("DELETE FROM user_roles");
    await db.query("DELETE FROM department_roles"); // Add this
    await db.query("DELETE FROM employee_department");
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM employees");
    await db.query("DELETE FROM positions");
    await db.query("DELETE FROM roles");
    await db.query("DELETE FROM department");
    await db.query("DELETE FROM companies");

    // Insert companies first
    const insertedCompanies = [];
    for (const company of companiesData) {
      const result = await db.query(
        "INSERT INTO companies (company_id, name, logo, tier, tenant_name, theme) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [company.company_id, company.name, company.logo, company.tier, company.tenant_name, company.theme]
      );
      insertedCompanies.push(result.rows[0]);
    }

    // Insert departments (must come before roles and positions)
    for (const department of departmentsData) {
      await db.query(
        "INSERT INTO department (id, name, company_id) VALUES ($1, $2, $3)", // Fixed: removed 'location', added 'company_id'
        [department.id, department.name, department.company_id] // Fixed: removed location, added company_id
      );
    }

    // Insert positions
    const insertedPositions = [];
    for (const position of positionsData) {
      const result = await db.query(
        "INSERT INTO positions (position_id, name, additional, company_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [position.position_id, position.name, position.additional, position.company_id]
      );
      insertedPositions.push(result.rows[0]);
    }

    // Insert roles (must come after departments)
    for (const role of rolesData) {
      await db.query(
        "INSERT INTO roles (id, name) VALUES ($1, $2)",
        [role.id, role.name]
      );
    }

    // Insert employees
    const insertedEmployees = [];
    for (const employee of employeesData) {
      const result = await db.query(
        "INSERT INTO employees (employee_id, name, profile_picture, company_id, position_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [employee.employee_id, employee.name, employee.profile_picture, employee.company_id, employee.position_id]
      );
      insertedEmployees.push(result.rows[0]);
    }

    // Insert users
    for (const user of usersData) {
      await db.query(
        "INSERT INTO users (user_id, email, password, employee_id) VALUES ($1, $2, $3, $4)", // Fixed: user_password -> password
        [user.user_id, user.email, user.password, user.employee_id]
      );
    }

    for (const deptRole of departmentRolesData) {
      await db.query(
        "INSERT INTO department_roles (id, department_id, role_id) VALUES ($1, $2, $3)",
        [deptRole.id, deptRole.department_id, deptRole.role_id]
      );
    }

    // Insert employee department mappings
    for (const employeeDepartment of employeeDepartmentData) {
      await db.query(
        "INSERT INTO employee_department (employee_id, department_id) VALUES ($1, $2)",
        [employeeDepartment.employee_id, employeeDepartment.department_id]
      );
    }

    // Insert user roles
    for (const userRole of userRolesData) {
      await db.query(
        "INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)",
        [userRole.user_id, userRole.role_id]
      );
    }

    await db.query('COMMIT');
    console.log('Database seeded successfully!');
  } catch (err) {
    await db.query('ROLLBACK');
    console.error('Seeding failed:', err.message);
    throw err;
  }
}

module.exports = seed;