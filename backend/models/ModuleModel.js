const db = require('../db/connection.js');

class ModulesModel {
  static async getAll(){
    const result = await db.query(`
      SELECT * 
      FROM modules
      `);
    return result.rows;
  }

  static async getById(id){
    const result = await db.query(`
      SELECT * 
      FROM modules 
      WHERE id = $1`, 
      [id]);
    return result.rows[0];
  }

  static async getByCompanyId(company_id){
    const result = await db.query(`
      SELECT m.*
      FROM modules m
      JOIN modules_companies mc ON m.id = mc.module_id
      WHERE mc.company_id = $1
      ORDER BY m.name
    `, [company_id]);
    return result.rows;
  }

  static async getByDepartmentId(department_id){
    const result = await db.query(`
      SELECT m.*
      FROM modules m
      JOIN modules_departments md ON m.id = md.module_id
      WHERE md.department_id = $1
      ORDER BY m.name
    `, [department_id]);
    return result.rows;
  }

  static async getByCompanyIdAndDepartmentId(company_id, department_id){
    const reseult = await db.query(`
    SELECT m.*,
            m.name AS module_name,
            d.name AS department_name,
            c.name AS company_name
    FROM modules m
    JOIN modules_departments md ON md.module_id = m.id
    JOIN departments d ON md.department_id = d.id
    JOIN companies c ON d.company_id = c.company_id
    WHERE d.company_id = $1
    AND md.department_id = $2
    ORDER BY m.name
      `, [company_id, department_id]);
  }

  static async create(name, company_id){
    const result = await db.query(`
      INSERT INTO modules (name, company_id) 
      VALUES ($1, $2) 
      RETURNING *`, 
      [name, company_id]);
    return result.rows[0];
  }

  static async delete(id){
    const result = await db.query(`
      DELETE FROM modules 
      WHERE id = $1 
      RETURNING *`, 
      [id]);
    return result.rows[0];
  }

  static async update(id, {name}){
    const result = await db.query(`
      UPDATE modules 
      SET name = $1 
      WHERE id = $2 
      RETURNING *`, 
      [name, id]);
    return result.rows[0];
  }

}

module.exports = ModulesModel;