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

exports.deleteEmployee = async(id) => {
  const result = await db.query("DELETE FROM employees WHERE employee_id = $1 RETURNING *", [id]);
  return result.rows[0];
}

exports.editEmployee = async (name, profile_picture, id) => {
  const result = await db.query("UPDATE employees SET name = $1, profile_picture = $2 WHERE employee_id = $3 RETURNING *", [name, profile_picture, id ]);
  return result.rows[0];
} 