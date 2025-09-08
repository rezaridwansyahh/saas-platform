const db = require('../db/connection.js');

class Companies {
  static async getAllCompanies() {
    const result = await db.query('SELECT * FROM companies');
    return result.rows;
  }

  static async getCompanyById(id) {
    const result = await db.query('SELECT * FROM companies WHERE company_id = $1', [id]);
    return result.rows[0];
  }

  static async getCompanyByTenant(tenant) {
    const result = await db.query('SELECT * FROM companies WHERE tenant_name = $1', [tenant]);
    return result.rows[0];
  }

  static async addCompany(company_id, name, logo, tier, tenant_name, additional) {
    const result = await db.query('INSERT INTO companies (company_id, name, logo, tier, tenant_name, additional) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [company_id, name, logo, tier, tenant_name, additional]);
    return result.rows[0];
  }

  static async removeCompany(id) {
    const result = await db.query('DELETE FROM companies WHERE company_id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async updateCompany(id, fields) {
    const key = Object.keys(fields);
    const value = Object.values(fields);

    const setClause = key.map((k, index) => `${k} = $${index + 1}`).join(', ');

    const query = `UPDATE companies SET ${setClause} WHERE company_id = $${key.length + 1} RETURNING *`;
    const result = await db.query(query, [...value, id]);
    
    return result.rows[0];
  }
}

module.exports = Companies;