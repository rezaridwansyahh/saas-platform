const db = require('../db/connection.js');

class MenusModel{
  static async getAllMenus(){
    const result = await db.query('SELECT * FROM menus');
    return result.rows;
  }

  static async getMenuById(id){
    const result = await db.query('SELECT * FROM menus WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async createMenu({name, module_id}){
    const result = await db.query('INSERT INTO menus (name, module_id) VALUES ($1, $2) RETURNING *', [name, module_id]);
    return result.rows[0];
  }

  static async updateMenu(id, {name}){
    const result = await db.query('UPDATE menus SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    return result.rows[0];
  }

  static async deleteMenu(id){
    const result = await db.query('DELETE FROM menus WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async getMenusByModuleId(module_id){
    const result = await db.query(
      'SELECT * FROM menus WHERE module_id = $1 ORDER BY name',
      [module_id]
    );
    return result.rows;
  }

  static async getMenusByCompanyId(company_id) {
    const query = `
      SELECT m.*, mod.name as module_name 
      FROM menus m
      JOIN modules mod ON m.module_id = mod.id
      WHERE mod.company_id = $1
      ORDER BY mod.name, m.name
    `;
    const result = await db.query(query, [company_id]);
    return result.rows;
  }

}

module.exports = MenusModel;