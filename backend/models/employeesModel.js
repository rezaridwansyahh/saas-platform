const db = require('../db/connection.js');

exports.getAllEmployees = async () => {
  const result = await db.query('SELECT * FROM employees');
  return result.rows;
}

exports.getEmployeeById = async (id) => {
  const result = await db.query('SELECT * FROM employees WHERE employee_id = $1', [id]);
  return result.rows[0];
}

exports.getEmployeeByCompanyId = async (companyId) => {
  const result = await db.query('SELECT * FROM employees WHERE company_id = $1', [companyId]);
  return result.rows;
}

exports.addEmployee = async (name, profile_picture, company_id, position_id) => {
  const result = await db.query('INSERT INTO employees (name, profile_picture, company_id, position_id) VALUES ($1, $2, $3, $4) RETURNING *', [name, profile_picture, company_id, position_id]);
  return result.rows[0];
}

exports.deleteEmployee = async(id) => {
  const result = await db.query("DELETE FROM employees WHERE employee_id = $1 RETURNING *", [id]);
  return result.rows[0];
}

exports.editEmployee = async (id, fields) => {
  const keys = Object.keys(fields);
  const values = Object.values(fields);

  const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');

  const result = await db.query(`UPDATE employees SET ${setClause} WHERE employee_id = $${keys.length + 1} RETURNING *`, [...values, id]);

  return result.rows[0];
}