const db = require('../db/connection.js');

exports.getAllPositions = async () => {
  const result = await db.query('SELECT * FROM positions');
  return result.rows;
}

exports.getPositionById = async (id) => {
  const result = await db.query('SELECT * FROM positions WHERE position_id = $1', [id]);
  return result.rows[0];
}

exports.getPositionByCompanyId = async (companyId) => {
  const result = await db.query('SELECT * FROM positions WHERE company_id = $1', [companyId]);
  return result.rows;
}

exports.addPosition = async (name, additional, company_id) => {
  const result = await db.query('INSERT INTO positions (name, additional, company_id) VALUES ($1, $2, $3) RETURNING *', [name, additional, company_id]);
  return result.rows[0];
}

exports.deletePosition = async(id) => {
  const result = await db.query("DELETE FROM positions WHERE position_id = $1 RETURNING *", [id]);
  return result.rows[0];
}

exports.editPosition = async(name, additional, id) => {
  const result = await db.query("UPDATE positions SET name = $1, additional = $2 WHERE position_id = $3 RETURNING *", [name, additional, id]);
  return result.rows[0];
}
