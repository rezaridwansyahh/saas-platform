const db = require('../db/connection.js');

class ModuleCompanyModel {
  static async getAll(){
    const result = await db.query(`
      SELECT * 
      FROM modules_companies 
    `);
    return result.rows;
  }

  static async getAllWithDetail(){
    const query = `
      SELECT mc.*,
             m.name as module_name,
             c.name as company_name
      FROM modules_companies mc
      JOIN modules m ON mc.module_id = m.id
      JOIN companies c ON mc.company_id = c.id
      ORDER BY c.name, m.name    
    `;
    const result = await db.query(query);
    return result.rows;
  }

  static async getById(id){
    const result = await db.query(`
      SELECT mc.*
      FROM modules_companies mc 
      WHERE mc.id = $1
      `, [id]);
    return result.rows[0];
  }

  static async getByModuleId(module_id){
    const result = await db.query(`
      SELECT mc.id,
              mc.module_id,
              m.name as module_name
      FROM modules_companies mc
      JOIN modules m ON mc.module_id = m.id
      WHERE mc.module_id = $1    
      `, [module_id]);
    return result.rows[0];
  }

  static async getByCompanyId(company_id){
    const result = await db.query(`
      SELECT mc.id,
              mc.company_id,
              c.name as company_name
      FROM modules_companies mc
      JOIN companies c ON mc.company_id = mc.id
      WHERE mc.company_id = $1    
      `, [company_id]);
    return result.rows[0];
  }

  static async getByModuleIdAndCompanyId(module_id, company_id){
    const result = await db.query(`
     SELECT mc.id,
               mc.module_id,
               mc.company_id,
               m.name as module_name,
               c.name as company_name
        FROM modules_companies mc
        JOIN modules m ON mc.module_id = m.id
        JOIN companies c ON mc.company_id = c.id
        WHERE mc.module_id = $1 AND mc.company_id = $2
      `, [module_id, company_id]);
    return result.rows[0];
  }

  static async create( module_id, company_id ){
    const result = await db.query(`
      INSERT INTO modules_companies (module_id, company_id) 
      VALUES ($1, $2) 
      RETURNING *
      `, [module_id, company_id]);
    return result.rows[0];
  }

  static async delete(id){
    const result = await db.query(
      `DELETE FROM modules_companies 
      WHERE id = $1 R
      ETURNING *`,
      [id]
    );
    return result.rows[0];
  }

}

module.exports = ModuleCompanyModel;