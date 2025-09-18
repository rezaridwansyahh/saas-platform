const db = require('../db/connection.js');

class Company {
  static async getAll() {
    const result = await db.query(`
      SELECT * 
      FROM companies
    `);

    return result.rows;
  }

  static async getById(id) {
    const result = await db.query(`
      SELECT * 
      FROM companies 
      WHERE id = $1
    `, [id]);

    return result.rows[0];
  }

  static async getByTenantName(tenant_name) {
    const result = await db.query(`
      SELECT * 
      FROM companies 
      WHERE tenant_name = $1
    `, [tenant_name]);

    return result.rows[0];
  }

  static async create(companyData) {
    const { id, name, logo, tier, tenant_name, additional } = companyData;
    const result = await db.query(`
      INSERT INTO companies (id, name, logo, tier, tenant_name, additional)
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *
    `, [id, name, logo, tier, tenant_name, additional]);

    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query(`
      DELETE FROM companies 
      WHERE id = $1
      RETURNING *
    `, [id]);
    
    return result.rows[0];
  }

  static async update(id, fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);

    const setClause = keys.map((k, index) => `${k} = $${index + 1}`).join(', ');

    const result = await db.query(`
      UPDATE companies
      SET ${setClause}
      WHERE id = $${keys.length + 1}
      RETURNING *
    `, [...values, id]);

    return result.rows[0];
  }
}

module.exports = Company;