const db = require('../db/connection.js');

class ModuleMenuModel {
  static async getAllModuleMenus(){
    const query = `
      SELECT mm.*,
             m.name as module_name,
             me.name as menu_name
      FROM module_menu mm
      JOIN modules m ON mm.module_id = m.id
      JOIN menus me ON mm.menu_id = me.id
      ORDER BY m.name, me.name
    `;
    const result = await db.query(query);
    return result.rows;
  }

  static async getModuleMenuById(id){
    const query = `
      SELECT mm.*,
             m.name as module_name,
             me.name as menu_name
      FROM module_menu mm
      JOIN modules m ON mm.module_id = m.id
      JOIN menus me ON mm.menu_id = me.id
      WHERE mm.id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async createModuleMenu({ module_id, menu_id }){
    const result = await db.query(
      'INSERT INTO module_menu (module_id, menu_id) VALUES ($1, $2) RETURNING *',
      [module_id, menu_id]
    );
    return result.rows[0];
  }

  static async updateModuleMenu(id, fields){
    const key = Object.keys(fields);
    const values = Object.values(fields);
    const setString = key.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const query = `UPDATE module_menu SET ${setString} WHERE id = $${key.length + 1} RETURNING *`;
    const result = await db.query(query, [...values, id]);
    return result.rows[0];
  }

  static async deleteModuleMenu(id){
    const result = await db.query(
      'DELETE FROM module_menu WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
  
  static async getModuleMenusByModuleId(module_id){
    const query = `
      SELECT me.*
      FROM module_menu mm
      JOIN menus me ON mm.menu_id = me.id
      WHERE mm.module_id = $1
      ORDER BY me.name
    `;
    const result = await db.query(query, [module_id]);
    return result.rows; 
  }

  static async getModuleMenusByMenuId(menu_id){
    const query = `
      SELECT mm.*,
             m.name as module_name,
              me.name as menu_name
      FROM module_menu mm
      JOIN modules m ON mm.module_id = m.id
      JOIN menus me ON mm.menu_id = me.id
      WHERE mm.menu_id = $1
      ORDER BY m.name
    `;
    const result = await db.query(query, [menu_id]);
    return result.rows;
  }
}

module.exports = ModuleMenuModel;