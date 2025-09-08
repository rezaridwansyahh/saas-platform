const db = require('../db/connection.js');

class UserRole {
  static async getRolesByUserId(userId) {
    if (!userId) throw new Error('User ID is required');
    
    const result = await db.query(`
      SELECT r.*
      FROM roles r
      JOIN user_roles ur ON r.id = ur.role_id
      WHERE ur.user_id = $1
    `, [userId]);
    return result.rows;
  }

  static async getUsersByRoleId(roleId) {
    if (!roleId) throw new Error('Role ID is required');
    
    const result = await db.query(`
      SELECT u.*
      FROM users u
      JOIN user_roles ur ON u.id = ur.user_id
      WHERE ur.role_id = $1
    `, [roleId]);
    return result.rows;
  }

  static async assignRoleToUser(userId, roleId) {
    if (!userId || !roleId) throw new Error('User ID and Role ID are required');
    
    // Check if assignment already exists
    const existing = await this.hasRole(userId, roleId);
    if (existing) {
      throw new Error('User already has this role');
    }

    const result = await db.query(`
      INSERT INTO user_roles (user_id, role_id)
      VALUES ($1, $2)
      RETURNING *
    `, [userId, roleId]);
    return result.rows[0];
  }

  static async removeRoleFromUser(userId, roleId) {
    if (!userId || !roleId) throw new Error('User ID and Role ID are required');
    
    const result = await db.query(`
      DELETE FROM user_roles
      WHERE user_id = $1 AND role_id = $2
      RETURNING *
    `, [userId, roleId]);
    
    if (result.rows.length === 0) {
      throw new Error('Role assignment not found');
    }
    return result.rows[0];
  }

  static async hasRole(userId, roleId) {
    const result = await db.query(`
      SELECT 1 FROM user_roles
      WHERE user_id = $1 AND role_id = $2
    `, [userId, roleId]);
    return result.rows.length > 0;
  }
}