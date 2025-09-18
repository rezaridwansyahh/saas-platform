const db = require('../db/connection.js');

class ModuleDepartmentModel{
  static async getAll(){
    const result = await db.query(`
      SELECT * 
      FROM modules_departments
      `);
    return result.rows;
  }

  static async getAllWithDetails(){
    const result = await db.query(`
      SELECT md.*,
             m.name as module_name,
             d.name as department_name,
      FROM modules_departments md
      JOIN modules m ON md.module_id = m.id
      JOIN department d ON md.department_id = d.id
      ORDER BY d.name, m.name    
    `);
    return result.rows;
  }

  static async getById(id){
    const result = await db.query(`
      SELECT md.*
      FROM modules_departments md
      WHERE md.id = $1   
    `, [id]);;
    return result.rows[0];
  }

  static async getByModuleId(module_id){
    const result = await db.query(`
      SELECT md.id,
              md.module_id,
              m.name as module_name
      FROM modules_departments md
      JOIN modules m ON md.module_id = m.id
      WHERE md.module_id = $1    
      `, [module_id]);
    return result.rows[0];
  }

  
  static async getByDepartmentId(department_id){
    const result = await db.query(`
      SELECT md.id,
              md.department_id,
              d.name as module_name
      FROM modules_departments md
      JOIN departments d ON md.department_id = d.id
      WHERE md.department_id = $1    
      `, [department_id]);
    return result.rows[0];
  }

  static async getByModuleIdAndDepartmentId(module_id, department_id){
    const result = await db.query(`
      SELECT md.*,
              m.name,
              d.name
      FROM modules_departments md
      JOIN modules m ON md.module_id = m.id
      JOIN departments d ON md.department_id = d.id
      WHERE md.module_id = $1 AND md.department_id = $2
      `, [module_id, department_id]);
    return result.rows[0];
  }


  static async create({ module_id, department_id }){
    const result = await db.query(`
      INSERT INTO modules_departments (module_id, department_id) 
      VALUES ($1, $2) 
      RETURNING *`, 
      [module_id, department_id]  
    );
    return result.rows[0];
  }

  static async update(id, fields) {
    const key = Object.keys(fields);
    const values = Object.values(fields);

    const setString = key.map((k, i) => `${k} = $${i + 1}`).join(', ');

    const result = await db.query(`
      UPDATE modules_departments 
      SET ${setString} 
      WHERE id = $${key.length + 1} 
      RETURNING *`, 
      [...values, id]);;
    return result.rows[0];
  }

  static async delete(id){
    const result = await db.query(
      `DELETE FROM modules_departments 
      WHERE id = $1 
      returning *`,
      [id]
    );
    return result.rows[0];
  }
}   

module.exports = ModuleDepartmentModel;
