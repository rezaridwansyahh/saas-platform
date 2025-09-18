const db = require('../db/connection.js');

class User {
  static async getAll() {
    const result = await db.query(`
      SELECT * 
      FROM users
    `);
    
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query(`
      SELECT * 
      FROM users 
      WHERE id = $1
    `, [id]);
    
    return result.rows[0];
  }

  static async getByEmail(email) {
    const result = await db.query(`
      SELECT * 
      FROM users 
      WHERE email = $1
    `, [email]);
    
    return result.rows[0];
  }

  static async getByEmployeeId(employee_id) {
    const result = await db.query(`
      SELECT * 
      FROM users 
      WHERE employee_id = $1
    `, [employee_id]);

    return result.rows[0];
  }

  static async getByPositionId(position_id) {
    const result = await db.query(`
      SELECT u.*
      FROM users u
      JOIN users_positions up ON u.id = up.position_id
      WHERE up.position_id = $1
    `, [position_id]);
  }

  static async create(userData) {
    const { employee_id, email, password } = userData;
    
    const result = await db.query(`
      INSERT INTO users (employee_id, email, password) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `, [employee_id, email, password]);
    
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query(`
      DELETE FROM users 
      WHERE id = $1 
      RETURNING *
    `, [id]);
    
    return result.rows[0];
  }

  static async update(id, fields) {
    const key = Object.keys(fields);
    const value = Object.values(fields);

    const setClause = key.map((k, index) => `${k} = $${index + 1}`).join(', ');

    const result = await db.query(`
      UPDATE users 
      SET ${setClause} 
      WHERE id = $${key.length + 1} 
      RETURNING *
    `, [...value, id]);

    return result.rows[0];
  }
}

module.exports = User;