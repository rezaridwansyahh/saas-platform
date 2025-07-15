const db = require('../db/connection.js');

exports.getAllUsers = async () => {
  const result = await db.query('SELECT * FROM users');
  return result.rows;
}

exports.getUserById = async (id) => {
  const result = await db.query('SELECT * FROM users WHERE user_id = $1', [id]);
  return result.rows[0];
}

exports.addUsers = async (employee_id, email, password) => {
  const result = await db.query('INSERT INTO users (employee_id, email, password) VALUES ($1, $2, $3)', [employee_id, email, password]);
  return result.rows[0];
}