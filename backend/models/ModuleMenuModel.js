const db = require('../db/connection.js');

class ModuleMenuModel {
  static async getAll(){
    const result = await db.query(`
      SELECT * 
      FROM modules_menus
    `);
    return result.rows;
  }

  static async getById(id){
    const result = await db.query(`
      SELECT * 
      FROM modules_menus
      WHERE id = $1
      `, [id]);;
      return result.rows[0];
    }
    
    static async getbyModuleId(module_id){
      const result = await db.query(`
        SELECT mm.*
        FROM modules_menus mm
        JOIN modules m ON mm.module_id = m.id
        WHERE m.id = $1
      `, [module_id]);
      return result.rows; 
    }
  
    static async getbyMenuId(menu_id){
      const result = await db.query(`
        SELECT mm.*
        FROM modules_menus mm
        JOIN menus mn ON mm.menu_id = mn.id
        WHERE menu_id = $1
      `, [menu_id]);;
      return result.rows;
    }

    static async getbyModuleIdAndMenuId(module_id, menu_id){
      const result = await db.query(`
      SELECT mm.*,
              m.name,
              mn.name
      FROM modules_menus mm
      JOIN modules m ON mm.module_id = m.id
      JOIN menus mn ON mm.menu_id = mn.id
      WHERE mm.module_id = $1 AND mm.menu_id = $2
      `, [module_id, menu_id]);;
      return result.rows;
    }

    static async create({ module_id, menu_id }){
    const result = await db.query(
      `INSERT INTO modules_menus (module_id, menu_id) 
      VALUES ($1, $2) 
      RETURNING *`,
      [module_id, menu_id]
    );
    return result.rows[0];
  }

  static async update(id, fields){
    const key = Object.keys(fields);
    const values = Object.values(fields);
    const setString = key.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const result = await db.query(`
    UPDATE modules_menus 
    SET ${setString} 
    WHERE id = $${key.length + 1} 
    RETURNING *`, [...values, id]);
    return result.rows[0];
  }

  static async delete(id){
    const result = await db.query(
      `DELETE FROM modules_menus 
      WHERE id = $1 
      RETURNING *`,
      [id]);
    return result.rows[0];
  }
  
}

module.exports = ModuleMenuModel;