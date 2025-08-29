const db = require('../db/connection.js');

class Roles {
  static async getAllRoles() {
    const result = await db.query('SELECT * FROM roles');
    return result.rows;
  }

  static async getRolesWithDepartments() {
    const result = await db.query(`
      SELECT r.id, r.name as role_name,
            d.id as department_id, d.name as department_name,
            c.name as company_name
      FROM roles r
      JOIN department_roles dr ON r.id = dr.role_id
      JOIN department d ON dr.department_id = d.id
      JOIN companies c ON d.company_id = c.company_id
      ORDER BY r.name, d.name;
    `);
    return result.rows;
  }

  static async getRoleById(id) {
    const result = await db.query('SELECT * FROM roles WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async getDepartmentByRoleId(id) {
    const result = await db.query(`
      SELECT d.*
      FROM department d
      JOIN department_roles dr ON d.id = dr.department_id
      WHERE dr.role_id = $1
    `, [id]);
    return result.rows;
  }

  static async getUserByRoleId(id) {
    const result = await db.query(`
      SELECT u.*
      FROM users u
      JOIN user_roles ur ON u.user_id = ur.user_id
      WHERE ur.role_id = $1
    `, [id]);
    return result.rows;
  }

  static async getRolesWithDepartments() {
    const result = await db.query(`
      SELECT r.id, r.name as role_name,
            d.id as department_id, d.name as department_name,
            c.name as company_name
      FROM roles r
      JOIN department_roles dr ON r.id = dr.role_id
      JOIN department d ON dr.department_id = d.id
      JOIN companies c ON d.company_id = c.company_id
      ORDER BY r.name, d.name;
    `);
    return result.rows;
  }

  static async addRoleToDepartment(roleId, departmentId) {
    const result = await db.query(`
      INSERT INTO department_roles (role_id, department_id)
      VALUES ($1, $2)
      ON CONFLICT (role_id, department_id) DO NOTHING
      RETURNING *;
    `, [roleId, departmentId]);
    return result.rows[0];
  }

  static async removeRoleFromDepartment(roleId, departmentId) {
    const result = await db.query(`
      DELETE FROM department_roles
      WHERE role_id = $1 AND department_id = $2
      RETURNING *;
    `, [roleId, departmentId]);
    return result.rows[0];
  }

}

module.exports = Roles;  