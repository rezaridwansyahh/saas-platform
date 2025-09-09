const db = require('../db/connection.js');

class Positions {
  static async getAllPositions() {
    const result = await db.query('SELECT * FROM positions');
    return result.rows;
  }

  static async getPositionById(id) {
    const result = await db.query('SELECT * FROM positions WHERE position_id = $1', [id]);
    return result.rows[0];
  }

  static async getPositionByCompanyId(companyId) {
    const result = await db.query('SELECT * FROM positions WHERE company_id = $1', [companyId]);
    return result.rows;
  }

  static async addPosition(name, additional, company_id) {
    const result = await db.query('INSERT INTO positions (name, additional, company_id) VALUES ($1, $2, $3) RETURNING *', [name, additional, company_id]);
    return result.rows[0];
  }

  static async deletePosition(id) {
    const result = await db.query("DELETE FROM positions WHERE position_id = $1 RETURNING *", [id]);
    return result.rows[0];
  }

  static async editPosition(id, fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);  

    if(keys.length === 0){
      throw new Error("No fields provided to update");
    }

    const processedValues = keys.map((val, index) => `${val} = $${index + 1}`).join(', ');
    
    const result = await db.query(`UPDATE positions SET ${processedValues} WHERE position_id = $${keys.length + 1} RETURNING *`, [...values, id]);
    return result.rows[0];
  }
}

module.exports = Positions;