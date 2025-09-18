const db = require('../../db/connection.js');
const companiesData = require('../data/development-data/companies.js');
const employeesData = require('../data/development-data/employees.js');
const rolesData = require('../data/development-data/roles.js');
const sectorsData = require('../data/development-data/sectors.js');
const usersData = require('../data/development-data/users.js');
const modulesData = require('../data/development-data/modules.js');
const menusData = require('../data/development-data/menus.js');
const positionsData = require('../data/development-data/positions.js');

const sectorsCompaniesData = require('../data/development-data/sectors_companies.js');
const sectorsRolesAccessData = require('../data/development-data/sectors_roles_access.js');

const departmentsData = require('../data/development-data/department.js');
const departmentsPositionsData = require('../data/development-data/department_positions.js');

const employeesDepartmentsData = require('../data/development-data/employee_department.js');

const usersPositionsData = require('../data/development-data/users_positions.js');

const modulesCompaniesData = require('../data/development-data/module_company.js');
const modulesDepartmentsData = require('../data/development-data/module_department.js');
const modulesMenusData = require('../data/development-data/module_menu.js');

const positionsMenusFunctionalitiesData = require('../data/development-data/positions_menu_functionality.js');

const seed = async () => {
  await db.query("BEGIN");
  try {
    // Delete in correct order (reverse dependency order)
    await db.query("DELETE FROM sectors_roles_access");
    await db.query("DELETE FROM sectors_companies");
    await db.query("DELETE FROM positions_menus_functionalities");
    await db.query("DELETE FROM users_positions");
    await db.query("DELETE FROM employees_departments");
    await db.query("DELETE FROM departments_positions");
    await db.query("DELETE FROM modules_menus");
    await db.query('DELETE FROM modules_departments');
    await db.query('DELETE FROM modules_companies');
    await db.query("DELETE FROM sectors");
    await db.query("DELETE FROM menus");
    await db.query("DELETE FROM modules");
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM employees");
    await db.query("DELETE FROM positions");
    await db.query("DELETE FROM roles");
    await db.query("DELETE FROM departments");
    await db.query("DELETE FROM companies");

    // 1. Insert companies
    for (const company of companiesData) {
      await db.query(
        "INSERT INTO companies (id, name, logo, tier, tenant_name, theme) VALUES ($1, $2, $3, $4, $5, $6)",
        [company.id, company.name, company.logo, company.tier, company.tenant_name, company.theme]
      );
    }

    // 2. Insert departments
    for (const department of departmentsData) {
      await db.query(
        "INSERT INTO departments (id, name, company_id) VALUES ($1, $2, $3)",
        [department.id, department.name, department.company_id]
      );
    }

    // 3. Insert roles
    for (const role of rolesData) {
      await db.query(
        "INSERT INTO roles (id, name, additional, company_id) VALUES ($1, $2, $3, $4)",
        [role.id, role.name, role.additional, role.company_id]
      );
    }

    // 4. Insert positions
    for (const position of positionsData) {
      await db.query(
        "INSERT INTO positions (id, name) VALUES ($1, $2)",
        [position.id, position.name]
      );
    }

    // 5. Insert employees
    for (const employee of employeesData) {
      await db.query(
        "INSERT INTO employees (id, name, profile_picture, company_id, role_id) VALUES ($1, $2, $3, $4, $5)",
        [employee.id, employee.name, employee.profile_picture, employee.company_id, employee.role_id]
      );
    }

    // 6. Insert users
    for (const user of usersData) {
      await db.query(
        "INSERT INTO users (id, email, password, employee_id) VALUES ($1, $2, $3, $4)",
        [user.id, user.email, user.password, user.employee_id]
      );
    }

    // 7. Insert modules
    for (const module of modulesData) {
      await db.query(
        "INSERT INTO modules (id, name) VALUES ($1, $2)",
        [module.id, module.name]
      );
    }

    // 8. Insert menus
    for (const menu of menusData) {
      await db.query(
        "INSERT INTO menus (id, name, module_id) VALUES ($1, $2, $3)",
        [menu.id, menu.name, menu.module_id]
      );
    }

    // 9. Insert sectors
    for (const sector of sectorsData) {
      await db.query(
        "INSERT INTO sectors (id, name) VALUES ($1, $2)",
        [sector.id, sector.name]
      );
    }

    // 10. Insert modules_companies mapping
    for (const moduleCompany of modulesCompaniesData){
      await db.query(
        "INSERT INTO modules_companies (id, module_id, company_id) VALUES ($1, $2, $3)",
        [moduleCompany.id, moduleCompany.module_id, moduleCompany.company_id]
      );
    }

    // 11. Insert modules_departments mapping
    for (const moduleDepartment of modulesDepartmentsData){
      await db.query(
        "INSERT INTO modules_departments (id, module_id, department_id) VALUES ($1, $2, $3)",
        [moduleDepartment.id, moduleDepartment.module_id, moduleDepartment.department_id]
      );
    }

    // 12. Insert modules_menus mapping
    for (const moduleMenu of modulesMenusData){
      await db.query(
        "INSERT INTO modules_menus (id, module_id, menu_id) VALUES ($1, $2, $3)",
        [moduleMenu.id, moduleMenu.module_id, moduleMenu.menu_id]
      );
    }

    // 13. Insert departments_positions mapping
    for (const departmentPosition of departmentsPositionsData) {
      await db.query(
        "INSERT INTO departments_positions (id, department_id, position_id) VALUES ($1, $2, $3)",
        [departmentPosition.id, departmentPosition.department_id, departmentPosition.position_id]
      );
    }

    // 14. Insert employees_departments mappings
    for (const employeeDepartment of employeesDepartmentsData) {
      await db.query(
        "INSERT INTO employees_departments (employee_id, department_id) VALUES ($1, $2)",
        [employeeDepartment.employee_id, employeeDepartment.department_id]
      );
    }

    // 15. Insert users_positions
    for (const userPosition of usersPositionsData) {
      await db.query(
        "INSERT INTO users_positions (user_id, position_id) VALUES ($1, $2)",
        [userPosition.user_id, userPosition.position_id]
      );
    }

    // 16. Insert positions_menus_functionalities mapping
    for (const positionMenuFunctionality of positionsMenusFunctionalitiesData){
      await db.query(
        "INSERT INTO positions_menus_functionalities (module_menu_id, position_id, functionality, additional) VALUES ($1, $2, $3, $4)",
        [positionMenuFunctionality.module_menu_id, positionMenuFunctionality.position_id, positionMenuFunctionality.functionality, positionMenuFunctionality.additional]
      );
    }

    // 17. Insert sectors_companies mapping
    for (const sectorCompany of sectorsCompaniesData){
      await db.query(
        "INSERT INTO sectors_companies (id, sector_id, company_id) VALUES ($1, $2, $3)",
        [sectorCompany.id, sectorCompany.sector_id, sectorCompany.company_id]
      );
    }

    // 18. Insert sectors_roles_access mapping
    for (const sectorRoleAccess of sectorsRolesAccessData){
      await db.query(
        "INSERT INTO sectors_roles_access (id, sector_company_id, role_id, access) VALUES ($1, $2, $3, $4)",
        [sectorRoleAccess.id, sectorRoleAccess.sector_company_id, sectorRoleAccess.role_id, sectorRoleAccess.access]
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