const db = require('../db/connection.js');

exports.getAllCompanies = async () => {
  const result = await db.query('SELECT * FROM companies');
  return result.rows;
}

exports.getCompanyById = async (id) => {
  const result = await db.query('SELECT * FROM companies WHERE company_id = $1', [id]);
  return result.rows[0];
}

exports.getCompanyByTenant = async (tenant) => {
  const result = await db.query('SELECT * FROM companies WHERE tenant_name = $1', [tenant]);
  return result.rows[0];
}

exports.addCompany = async (company_id, name, logo, tier, tenant_name, additional) => {
  const result = await db.query('INSERT INTO companies (company_id, name, logo, tier, tenant_name, additional) VALUES ($1, $2, $3, $4, $5, $6)', [company_id, name, logo, tier, tenant_name, additional]);
  return result.rows[0];
}