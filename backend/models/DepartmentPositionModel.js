const db = require('../db/connection.js');

class DepartmentPosition {
  static async getAll() {
    const result = await db.query(`
      SELECT * 
      FROM departments_positions
    `);

    return result.rows; 
  }

  static async getAllWithDetails() {
    const result = await db.query(`
      SELECT 
        dp.*,
        d.name as department_name,
        p.name as position_name
      FROM departments_positions dp
      JOIN departments d ON dp.department_id = d.id
      JOIN positions p ON dp.position_id = p.id
    `);
    
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query(`
      SELECT * 
      FROM departments_positions
      WHERE id = $1
    `, [id]);

    return result.rows;
  }

  static async getByDepartmentId(department_id) {
    const result = await db.query(`
      SELECT * 
      FROM departments_positions
      WHERE department_id = $1
    `, [department_id]);

    return result.rows;
  }

  static async getByPositionId(position_id) {
    const result = await db.query(`
      SELECT * 
      FROM departments_positions
      WHERE position_id = $1
    `, [position_id]);

    return result.rows;
  }

  static async getByDepartmentAndPosition(department_id, position_id) {
    const result = await db.query(`
      SELECT 
        dp.*,
        d.name as department_name,
        p.name as position_name
      FROM departments_positions dp
      JOIN departments d ON pr.department_id = d.id
      JOIN positions p ON dp.position_id = p.id
      WHERE dp.department_id = $1 AND dp.position_id = $2
    `, [department_id, position_id]);
    return result.rows[0];
  }

  static async create(department_id, position_id) {
    const result = await db.query(`
      INSERT INTO departments_positions (department_id, position_id)
      VALUES ($1, $2)
      RETURNING *
    `, [department_id, position_id]);

    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query(`
      DELETE FROM departments_positions
      WHERE id = $1
      RETURNING *
    `, [id]);

    return result.rows[0];
  }
}

module.exports = DepartmentPosition;