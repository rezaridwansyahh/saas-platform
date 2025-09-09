const db = require('../db/connection.js');

class ModulesModel {
  static async getAllModules(){
    const result = await db.query('SELECT * FROM modules');
    return result.rows;
  }

  static async getModuleById(id){
    const result = await db.query('SELECT * FROM modules WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async getMenusByModuleId(module_id){
    const query = `
      SELECT * FROM menus 
      WHERE module_id = $1 
      ORDER BY name  
      `;
    const result = await db.query(query, [module_id]);
    return result.rows;
  }

  static async createModule(name, company_id){
    const result = await db.query('INSERT INTO modules (name, company_id) VALUES ($1, $2) RETURNING *', [name, company_id]);
    return result.rows[0];
  }

  static async deleteModule(id){
    const result = await db.query('DELETE FROM modules WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async updateModule(id, {name}){
    const result = await db.query('UPDATE modules SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    return result.rows[0];
  }
}

module.exports = ModulesModel;