const db = require('../db/connection.js');

class RoleMenuFunctionality {
  static async getAllRoleMenuFunctionality(){
    const query = `
      SELECT rmf.*, 
             r.name as role_name,
             m.name as menu_name,
             mod.name as module_name,
             mm.module_id,
             mm.menu_id
      FROM role_menu_functionality rmf
      JOIN roles r ON rmf.role_id = r.id
      JOIN module_menu mm ON rmf.module_menu_id = mm.id
      JOIN menus m ON mm.menu_id = m.id
      JOIN modules mod ON mm.module_id = mod.id
      ORDER BY mod.name, m.name, r.name
    `;
    const result = await db.query(query);
    return result.rows;
  }

  static async getRoleMenuFunctionalityById(role_id, module_menu_id){
    const query = `
      SELECT rmf.*, 
             r.name as role_name,
             m.name as menu_name,
             mod.name as module_name
      FROM role_menu_functionality rmf
      JOIN roles r ON rmf.role_id = r.id
      JOIN module_menu mm ON rmf.module_menu_id = mm.id
      JOIN menus m ON mm.menu_id = m.id
      JOIN modules mod ON mm.module_id = mod.id
      WHERE rmf.role_id = $1 AND rmf.module_menu_id = $2
    `;
    const result = await db.query(query, [role_id, module_menu_id]);
    return result.rows[0];
  }

  static async createRoleMenuFunctionality({ role_id, module_menu_id, functionality, additional = null }){
    const result = await db.query(
      'INSERT INTO role_menu_functionality (role_id, module_menu_id, functionality, additional) VALUES ($1, $2, $3, $4) RETURNING *',
      [role_id, module_menu_id, functionality, additional]
    );
    return result.rows[0];
  }

  static async deleteRoleMenuFunctionality(role_id, module_menu_id, functionality){
    const result = await db.query(
      'DELETE FROM role_menu_functionality WHERE role_id = $1 AND module_menu_id = $2 AND functionality = $3 RETURNING *',
      [role_id, module_menu_id, functionality]
    );
    return result.rows[0];
  }

  static async getFunctionalityByRoleId(role_id) {
    const query = `
      SELECT rmf.*, 
             m.name as menu_name,
             mod.name as module_name,
             mm.module_id,
             mm.menu_id
      FROM role_menu_functionality rmf
      JOIN module_menu mm ON rmf.module_menu_id = mm.id
      JOIN menus m ON mm.menu_id = m.id
      JOIN modules mod ON mm.module_id = mod.id
      WHERE rmf.role_id = $1
      ORDER BY mod.name, m.name
    `;
    const result = await db.query(query, [role_id]);
    return result.rows;
  }

  static async getRoleMenuFunctionalityByModuleMenuId(module_menu_id) {
    const query = `
      SELECT rmf.*, 
             r.name as role_name,
             m.name as menu_name,
             mod.name as module_name,
             mm.module_id,
             mm.menu_id
      FROM role_menu_functionality rmf
      JOIN roles r ON rmf.role_id = r.id
      JOIN module_menu mm ON rmf.module_menu_id = mm.id
      JOIN menus m ON mm.menu_id = m.id
      JOIN modules mod ON mm.module_id = mod.id
      WHERE rmf.module_menu_id = $1
      ORDER BY r.name    
    `; 
    const result = await db.query(query, [module_menu_id]);
    return result.rows;
  }

}

module.exports = RoleMenuFunctionality;