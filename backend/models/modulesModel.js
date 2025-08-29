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

  static async getModulesByCompanyId(company_id){
    const result = await db.query('SELECT * FROM modules WHERE company_id = $1', [company_id]);
    return result.rows;
  }

  static async getUserModules(user_id){
    const query = `
      SELECT DISTINCT m.* FROM modules m
      JOIN module_department md ON m.id = md.module_id
      JOIN department d ON md.department_id = d.id
      JOIN employees e ON d.id = e.department_id
      JOIN users u ON e.employee_id = u.employee_id
      WHERE u.user_id = $1
      ORDER BY m.name
    `;
    const result = await db.query(query, [user_id]);
    return result.rows;
  }

  static async  getMappedMenusByModuleId(module_id){
    const query = `
      SELECT m.* FROM menus m
      JOIN module_menu mm ON m.id = mm.menu_id
      WHERE mm.module_id = $1
      ORDER BY m.name
    `;
    const result = await db.query(query, [module_id]);
    return result.rows;
  }

  static async getDepartmentsByModuleId(moduleId) {
    const query = `
      SELECT d.*, md.id as mapping_id
      FROM department d
      INNER JOIN module_department md ON d.id = md.department_id
      WHERE md.module_id = $1
      ORDER BY d.name
    `;
    const result = await db.query(query, [moduleId]);
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