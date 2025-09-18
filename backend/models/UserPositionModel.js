const db = require('../db/connection.js');

class UserPosition {
  static async getAll() {    
    const result = await db.query(`
      SELECT *
      FROM users_positions
    `);

    return result.rows;
  }

  static async getAllDetails() {
    const result = await db.query(`
      SELECT
        up.*
        u.name as user_name
        p.name as position_name
      FROM users_positions up
      JOIN users u ON up.user_id = u.id
      JOIN positions up.position_id = p.id
    `);

    return result.rows;
  }

  static async getById(id) {
    const result = await db.query(`
      SELECT *
      FROM users_positions
      WHERE id = $1  
    `, [id]);

    return result.rows[0];
  }

  static async getByUserId(user_id) {
    const result = await db.query(`
      SELECT *
      FROM users_positions
      WHERE user_id = $1
    `, [user_id]);

    return result.rows;
  } 

  static async getByUserIdDetails(user_id) {
    const result = await db.query(`
      SELECT 
        up.*,
        u.name as user_name
      FROM users_positions up
      JOIN users u ON up.user_id = u.id
      WHERE user_id = $1
    ` [user_id]);

    return result.rows;
  }

  static async getByPositionId(position_id) {
    const result = await db.query(`
      SELECT *
      FROM users_positions
      WHERE position_id = $1  
    `, [position_id]);

    return result.rows;
  }

  static async getByPositionIdDetails(position_id) {
    const result = await db.query(`
      SELECT
        up.*,
        p.name as position_name
      FROM users_positions up
      JOIN positions p ON up.position_id = p.id
      WHERE position_id = $1
    `, )
  }

  static async getByUserAndPosition(user_id, position_id) {
    const result = await db.query(`
      SELECT *
      FROM users_positions
      WHERE user_id = $1 AND position_id = $2
    `, [user_id, position_id]);

    return result.rows[0];
  }

  static async getByUserAndPositionDetails(user_id, position_id) {
    const result = await db.query(`
      SELECT 
        up.user_id,
        u.email as user_email,
        up.position_id,
        p.name as position_name
      FROM users_positions up
      JOIN users u on up.user_id = u.id
      JOIN positions p on up.position_id = p.id
      WHERE user_id = $1 AND position_id = $2
    `, [user_id, position_id]);

    return result.rows;
  }

  static async create(user_id, position_id) {
    const result = await db.query(`
      INSERT INTO users_positions (user_id, position_id)
      VALUES ($1, $2)
      RETURNING *
    `, [user_id, position_id]);
    return result.rows[0];
  }

  static async delete(user_id, position_id) {
    const result = await db.query(`
      DELETE FROM users_positions
      WHERE user_id = $1 AND position_id = $2
      RETURNING *
    `, [user_id, position_id]);

    return result.rows[0];
  }
}

module.exports = UserPosition;