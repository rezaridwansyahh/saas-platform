const db = require('../../db/connection.js');
const companiesData = require('../data/development-data/companies.js');
const employeesData = require('../data/development-data/employees.js');
const rolesData = require('../data/development-data/roles.js')
const usersData = require('../data/development-data/users.js');
const modulesData = require('../data/development-data/modules.js');
const menusData = require('../data/development-data/menus.js');
const positionsData = require('../data/development-data/positions.js');
const departmentsData = require('../data/development-data/department.js');
const departmentsPositionsData = require('../data/development-data/department_positions.js'); // Add this import
const employeeDepartmentData = require('../data/development-data/employee_department.js');
const usersPositionsData = require('../data/development-data/users_positions.js');
const moduleCompanyData = require('../data/development-data/module_company.js');
const moduleDepartmenData = require('../data/development-data/module_department.js');
const moduleMenuData = require('../data/development-data/module_menu.js');
const roleMenuFunctionalityData = require('../data/development-data/role_menu_functionality.js');

const seed = async () => {
  await db.query("BEGIN");
  try {
    // Delete in correct order (reverse dependency order)
    await db.query("DELETE FROM positions_menus_functionalities");
    await db.query("DELETE FROM users_positions");
    await db.query("DELETE FROM departments_positions"); // Add this
    await db.query("DELETE FROM modules_menus");
    await db.query('DELETE FROM modules_departments');
    await db.query('DELETE FROM modules_companies');
    await db.query("DELETE FROM employees_departments");
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM employees");
    await db.query("DELETE FROM positions");
    await db.query("DELETE FROM roles");
    await db.query("DELETE FROM department");
    await db.query("DELETE FROM menus");
    await db.query("DELETE FROM modules");
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
        "INSERT INTO departments (id, name, company_id) VALUES ($1, $2, $3)", // Fixed: removed 'location', added 'company_id'
        [department.id, department.name, department.company_id] // Fixed: removed location, added company_id
      );
    }

    // Insert roles
    const insertedRoles = [];
    for (const role of rolesData) {
      const result = await db.query(
        "INSERT INTO roles (role_id, name, additional, company_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [role.role_id, role.name, role.additional, role.company_id]
      );
      insertedRoles.push(result.rows[0]);
    }

    // Insert positions (must come after departments)
    for (const position of positionsData) {
      await db.query(
        "INSERT INTO positions (id, name) VALUES ($1, $2)",
        [position.id, position.name]
      );
    }

    // Insert employees
    const insertedEmployees = [];
    for (const employee of employeesData) {
      const result = await db.query(
        "INSERT INTO employees (employee_id, name, profile_picture, company_id, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [employee.employee_id, employee.name, employee.profile_picture, employee.company_id, employee.role_id]
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

    // Insert Modules
    const insertedModules = [];
    for (const module of modulesData) {
      const result = await db.query(
        "INSERT INTO modules (id, name) VALUES ($1, $2) RETURNING *",
        [module.id, module.name]
      );
      insertedModules.push(result.rows[0]);
    }

    //insert Menus
    const insertedmenus = [];
    for (const menu of menusData) {
      const result = await db.query(
        "INSERT INTO menus (id, name, module_id) VALUES ($1, $2, $3) RETURNING *",
        [menu.id, menu.name, menu.module_id]
      );
      insertedmenus.push(result.rows[0]);
    }

    // Insert Module_company mapping
    for (const moduleCompany of moduleCompanyData){
      await db.query(
        "INSERT INTO modules_companies (id, module_id, company_id) VALUES ($1, $2, $3)",
        [moduleCompany.id, moduleCompany.module_id, moduleCompany.company_id]
      );
    }

    // Insert module_department mapping
    for (const moduleDepartment of moduleDepartmenData){
      await db.query(
        "INSERT INTO modules_departments (id, module_id, department_id) VALUES ($1, $2, $3)",
        [moduleDepartment.id, moduleDepartment.module_id, moduleDepartment.department_id]
      );
    }

    // Insert module_menu mapping
    for (const moduleMenu of moduleMenuData){
      await db.query(
        "INSERT INTO modules_menus (id, module_id, menu_id) VALUES ($1, $2, $3)",
        [moduleMenu.id, moduleMenu.module_id, moduleMenu.menu_id]
      );
    }

    // Insert position_department mapping
    for (const deptPosition of departmentsPositionsData) {
      await db.query(
        "INSERT INTO departments_positions (id, department_id, position_id) VALUES ($1, $2, $3)",
        [deptPosition.id, deptPosition.department_id, deptPosition.position_id]
      );
    }

    // Insert employee department mappings
    for (const employeeDepartment of employeeDepartmentData) {
      await db.query(
        "INSERT INTO employees_departments (employee_id, department_id) VALUES ($1, $2)",
        [employeeDepartment.employee_id, employeeDepartment.department_id]
      );
    }

    // Insert user positions
    for (const userPosition of usersPositionsData) {
      await db.query(
        "INSERT INTO users_positions (user_id, position_id) VALUES ($1, $2)",
        [userPosition.user_id, userPosition.position_id]
      );
    }

    // Insert role_menu_functionality mapping
    for (const roleMenuFunc of roleMenuFunctionalityData){
      await db.query(
        "INSERT INTO positions_menus_functionalities (module_menu_id, position_id, functionality, additional) VALUES ($1, $2, $3, $4)",
        [roleMenuFunc.module_menu_id, roleMenuFunc.role_id, roleMenuFunc.functionality, roleMenuFunc.additional]
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