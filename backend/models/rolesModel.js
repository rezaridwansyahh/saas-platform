const db = require('../db/connection.js');

class Roles {
  static async getAllRoles() {
    const result = await db.query('SELECT * FROM roles');
    return result.rows;
  }

  static async getRoleById(id) {
    const result = await db.query('SELECT * FROM roles WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async addRole(name) {
    const result = await db.query(`INSERT INTO roles (name) VALUES ($1) RETURNING *`, [name]);
    return result.rows[0];
  }

  static async removeRole(roleId) {
    const result = await db.query('DELETE FROM roles WHERE id = $1 RETURNING *', [roleId]);
    return result.rows[0];
  }

  static async updateRole(roleId, updatedName) {
    const result = await db.query(`
      UPDATE roles SET name = $1 WHERE id = $2 RETURNING *;
    `, [updatedName, roleId]);
    return result.rows[0];
  }
}

module.exports = Roles;  