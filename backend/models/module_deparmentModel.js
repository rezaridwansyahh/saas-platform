const db = require('../db/connection.js');

class ModuleDepartmentModel{
  static async getAllModuleDeparment(){
    const query = `
      SELECT md.*,
             m.name as module_name,
             d.name as department_name,
             c.name as company_name,
             c.company_id
      FROM module_department md
      JOIN modules m ON md.module_id = m.id
      JOIN department d ON md.department_id = d.id
      JOIN companies c ON d.company_id = c.company_id
      ORDER BY c.name, d.name, m.name    
    `;
    const result = await db.query(query);
    return result.rows;
  }

  static async getModuleDepartmentById(id){
    const query = `
      SELECT md.*,
             m.name as module_name,
             d.name as department_name,
             c.name as company_name,
             c.company_id
      FROM module_department md
      JOIN modules m ON md.module_id = m.id
      JOIN department d ON md.department_id = d.id
      JOIN companies c ON d.company_id = c.company_id
      WHERE md.id = $1   
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async createModuleDepartment({ module_id, department_id }){
    const result = await db.query(
      'INSERT INTO module_department (module_id, department_id) VALUES ($1, $2) RETURNING *', 
      [module_id, department_id]  
    );
    return result.rows[0];
  }

  static async updatemoduleDepartment(id, fields) {
    const key = Object.keys(fields);
    const values = Object.values(fields);

    const setString = key.map((k, i) => `${k} = $${i + 1}`).join(', ');

    const query = `UPDATE module_department SET ${setString} WHERE id = $${key.length + 1} RETURNING *`;

    const result = await db.query(query, [...values, id]);
    return result.rows[0];
  }

  static async deleteModuleDepartment(id){
    const result = await db.query(
      'DELETE FROM module_department WHERE id = $1 returning *',
      [id]
    );
    return result.rows[0];
  }

  static async getModuleDepartmentsByModuleId(module_id){
    const query = `
      SELECT md.*,
             m.name as module_name,
             d.name as department_name,
             c.name as company_name,
             c.company_id
      FROM module_department md
      JOIN modules m ON md.module_id = m.id
      JOIN department d ON md.department_id = d.id
      JOIN companies c ON d.company_id = c.company_id
      WHERE md.module_id = $1
      ORDER BY c.name, d.name
    `;
    const result = await db.query(query, [module_id]);
    return result.rows;
  }

  static async getModuleDepartmentsByDepartmentId(department_id){
    const query = `
      SELECT md.*,
             m.name as module_name,
             d.name as department_name,
             c.name as company_name
      FROM module_department md
      JOIN modules m ON md.module_id = m.id
      JOIN department d ON md.department_id = d.id
      JOIN companies c ON d.company_id = c.company_id
      WHERE md.department_id = $1
      ORDER BY m.name
    `;
    const result = await db.query(query, [department_id]);
    return result.rows;
  }
}   

module.exports = ModuleDepartmentModel;
