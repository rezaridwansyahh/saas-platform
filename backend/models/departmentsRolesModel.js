const db = require('../db/connection.js');

class DepartmentRoles {
  static async getDepartmentByRoleId(roleId) {
    const result = await db.query(`
      SELECT d.*
      FROM department d
      JOIN department_roles dr ON d.id = dr.department_id
      WHERE dr.role_id = $1
    `, [roleId]);

    return result.rows;
  }

  static async getRolesByDepartmentId(departmentId) {
    const result = await db.query(`
      SELECT r.*
      FROM roles r
      JOIN department_roles dr ON r.id = dr.role_id
      WHERE dr.department_id = $1
    `, [departmentId]);

    return result.rows;
  }

  static async assignRoleToDepartment(departmentId, roleId) {
    const result = await db.query(`
      INSERT INTO department_roles (department_id, role_id)
      VALUES ($1, $2)
      RETURNING *
    `, [departmentId, roleId]);

    return result.rows[0];
  }

  static async removeRoleFromDepartment(departmentId, roleId) {
    const result = await db.query(`
      DELETE FROM department_roles
      WHERE department_id = $1 AND role_id = $2
      RETURNING *
    `, [departmentId, roleId]);

    return result.rows[0];
  }
}

module.exports = DepartmentRoles;