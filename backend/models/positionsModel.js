const db = require('../db/connection.js');

exports.getAllPositions = async () => {
  const result = await db.query('SELECT * FROM positions');
  return result.rows;
}

exports.getPositionById = async (id) => {
  const result = await db.query('SELECT * FROM positions WHERE position_id = $1', [id]);
  return result.rows[0];
}

exports.addPosition = async (name, additional, company_id) => {
  const result = await db.query('INSERT INTO positions (name, additional, company_id) VALUES ($1, $2, $3)', [name, additional, company_id]);
  return result.rows[0];
}