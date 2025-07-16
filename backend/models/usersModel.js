const db = require('../db/connection.js');

exports.getAllUsers = async () => {
  const result = await db.query('SELECT * FROM users');
  return result.rows;
}

exports.getUserById = async (id) => {
  const result = await db.query('SELECT * FROM users WHERE user_id = $1', [id]);
  return result.rows[0];
}

exports.addUser = async (employee_id, user_id, email, password) => {
  const result = await db.query('INSERT INTO users (employee_id, user_id, email, user_password) VALUES ($1, $2, $3, $4)', [employee_id, user_id, email, password]);
  return result.rows[0];
}

exports.getUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
}