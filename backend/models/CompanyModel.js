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

  static async getByModuleId(module_id) {
    const result = await db.query(`
      SELECT c.*
      FROM companies c
      JOIN modules_companies mc ON c.id = mc.company_id
      WHERE mc.module_id = $1
    `, [module_id]);

    return result.rows;
  }

  static async create(companyData) {
    const { name, logo, tier, tenant_name, additional, theme } = companyData;
  
    const result = await db.query(`
      INSERT INTO companies (name, logo, tier, tenant_name, additional, theme)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [name, logo, tier, tenant_name, additional, theme]);

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