const db = require('../db/connection.js');

exports.getAllEmployees = async () => {
  const result = await db.query('SELECT * FROM employees');
  return result.rows;
}

exports.getEmployeeById = async (id) => {
  const result = await db.query('SELECT * FROM employees WHERE employee_id = $1', [id]);
  return result.rows[0];
}

exports.addEmployee = async (name, profile_picture, company_id, position_id) => {
  const result = await db.query('INSERT INTO employees (name, profile_picture, company_id, position_id) VALUES ($1, $2, $3, $4)', [name, profile_picture, company_id, position_id]);
  return result.rows[0];
}