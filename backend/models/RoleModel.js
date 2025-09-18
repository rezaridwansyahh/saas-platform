const db = require('../db/connection.js');

class Role {
  static async getAll() {
    const result = await db.query(`
      SELECT * 
      FROM roles
    `);

    return result.rows;
  }

  static async getById(id) {
    const result = await db.query(`
      SELECT * 
      FROM roles 
      WHERE id = $1
    `, [id]);

    return result.rows[0];
  }

  static async getByCompanyId(company_id) {
    const result = await db.query(`
      SELECT * 
      FROM roles 
      WHERE company_id = $1
    `, [company_id]);

    return result.rows;
  }

  static async create(roleData) {
    const { name, additional, company_id } = roleData;

    const result = await db.query(`
      INSERT INTO roles (name, additional, company_id) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `, [name, additional, company_id]);
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query(`
      DELETE FROM roles 
      WHERE id = $1 
      RETURNING *`
    , [id]);
    
    return result.rows[0];
  }

  static async update(id, fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);  

    const setClause = keys.map((val, index) => `${val} = $${index + 1}`).join(', ');
    
    const result = await db.query(`
      UPDATE positions 
      SET ${setClause} 
      WHERE id = $${keys.length + 1} 
      RETURNING *
    `, [...values, id]);
    
    return result.rows[0];
  }
}

module.exports = Role;