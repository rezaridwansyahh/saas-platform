const db = require('../db/connection.js');

class PositionMenuFunctionality {
  static async getAll(){
    const result = await db.query(`
      SELECT * 
      FROM positions_menus_functionalities
    `);
    return result.rows;
  }

  static async getById(id){
    const result = await db.query(`
      SELECT * 
      FROM positions_menus_functionalities
      WHERE id = $1 
      `, [id]);
      return result.rows[0];
    }

    static async getByPositionId(position_id) {
      const result = await db.query(`
        SELECT pmf.*,
              p.name AS position_name
        FROM positions_menus_functionalities pmf
        JOIN positions p ON pmf.position_id = p.id
        WHERE pmf.position_id = $1
        ORDER BY p.name
      `, [position_id]);
      return result.rows;
    }
  
    static async getByModuleMenuId(module_menu_id) {
      const result = await db.query(`
        SELECT pmf.*
        FROM positions_menus_functionalities pmf
        join modules_menus mm ON pmf.module_menu_id = mm.id
        WHERE pmf.module_menu_id = $1
      `, [module_menu_id]); 
      return result.rows;
    }

    static async getByPositionIdAndModuleMenuId(position_id, module_menu_id){
      const result = await db.query(`
        SELECT pmf.*,
              p.name AS position_name
        FROM positions_menus_functionalities pmf
        JOIN positions p ON pmf.position_id = p.id
        JOIN modules_menus mm ON pmf.module_menu_id = mm.id
        WHERE pmf.position_id = $1 
          AND pmf.module_menu_id = $2
        ORDER BY p.name
      `, [position_id, module_menu_id]);
      return result.rows;
    }
    
    static async create({ role_id, module_menu_id, functionality, additional = null }){
      const result = await db.query(
        `INSERT INTO positions_menus_functionalities (role_id, module_menu_id, functionality, additional)
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [role_id, module_menu_id, functionality, additional]
    );
    return result.rows[0];
  }
  
  static async update(id, fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    if (keys.length === 0) {
      throw new Error("No fields provided to update");
    }
    const setString = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const result = await db.query(`
      UPDATE positions_menus_functionalities
      SET ${setString}
      WHERE id = $${keys.length + 1}
      RETURNING *
    `, [...values, id]);
    return result.rows[0];
  }

  static async delete(id){
    const result = await db.query(`
      DELETE FROM positions_menus_functionalities 
      WHERE id = $1
      RETURNING *`,
      [id]);
    return result.rows[0];
  }
}

module.exports = PositionMenuFunctionality;