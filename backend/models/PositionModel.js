const db = require('../db/connection.js');

class Position {
  static async getAll() {
    const result = await db.query(`
      SELECT * 
      FROM positions
    `);
    
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query(`
      SELECT * 
      FROM positions 
      WHERE id = $1
    `, [id]);
    
    return result.rows[0];
  }

  static async getByDepartmentId(department_id) {
    const result = await db.query(`
      SELECT p.*
      FROM positions p
      JOIN department_positions dp ON p.id = dp.position_id
      WHERE dp.department_id = $1
    `, [department_id]);

    return result.rows;
  }

  static async getByModuleMenuFunctionalityId(module_menu_functionality_id) {
    const result = await db.query(`
      SELECT p.*
      FROM positions p
      JOIN positions_menus_functionalities pmf ON p.id = pmf.position_id
      WHERE pmf.id = $1
    `, [module_menu_functionality_id]);

    return result.rows;
  }

  static async getByUserId(user_id) {
    const result = await db.query(`
      SELECT p.*
      FROM positions p
      JOIN users_positions up ON p.id = up.position_id
      WHERE up.user_id = $1 
    `, [user_id]);

    return result.rows;
  }

  static async create(name) {
    const result = await db.query(`
      INSERT INTO positions (name) 
      VALUES ($1) 
      RETURNING *
    `, [name]);
    
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query(`
      DELETE FROM positions 
      WHERE id = $1 
      RETURNING *
      `, [id]);
    
      return result.rows[0];
  }

  static async update(id, fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);

    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(`, `);

    const result = await db.query(`
      UPDATE positions 
      SET ${setClause} 
      WHERE id = $${keys.length + 1} 
      RETURNING *;
    `, [...values, id]);
    return result.rows[0];
  }
}

module.exports = Position;  