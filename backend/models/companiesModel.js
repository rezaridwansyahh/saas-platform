const db = require('../db/connection.js');

exports.getAllCompanies = async () => {
  const result = await db.query('SELECT * FROM companies');
  return result.rows;
}

exports.getCompanyById = async (id) => {
  const result = await db.query('SELECT * FROM companies WHERE company_id = $1', [id]);
  return result.rows[0];
}

exports.addCompany = async (company_id, name, logo, tier, additional) => {
  const result = await db.query('INSERT INTO companies (company_id, name, logo, tier, additional) VALUES ($1, $2, $3, $4, $5)', [company_id, name, logo, tier, additional]);
  return result.rows[0];
}