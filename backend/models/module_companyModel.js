const db = require('../db/connection.js');

class ModuleCompanyModel {
  static async getAllModuleCompanies(){
    const query = `
      SELECT mc.*,
             m.name as module_name,
             c.name as company_name
      FROM module_company mc
      JOIN modules m ON mc.module_id = m.id
      JOIN companies c ON mc.company_id = c.company_id
      ORDER BY c.name, m.name    
    `;
    const result = await db.query(query);
    return result.rows;
  }

  static async getModuleCompanyById(id){
    const query = `
      SELECT mc.*,
             m.name as module_name,
             c.name as company_name
      FROM module_company mc
      JOIN modules m ON mc.module_id = m.id
      JOIN companies c ON mc.company_id = c.company_id
      WHERE mc.id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async createModuleCompany({ module_id, company_id }){
    const result = await db.query(
      'INSERT INTO module_company (module_id, company_id) VALUES ($1, $2) RETURNING *',
      [module_id, company_id]
    );
    return result.rows[0];
  }

  static async updateModuleCompany(id, fields){
    const key = Object.keys(fields);
    const values = Object.values(fields);

    const setString = key.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const query = `UPDATE module_company SET ${setString} WHERE id = $${key.length + 1} RETURNING *`;

    const result = await db.query(query, [...values, id]);
    return result.rows[0];
  }

  static async deleteModuleCompany(id){
    const result = await db.query(
      'DELETE FROM module_company WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }

  static async getModulesByCompanyId(company_id){
    const query = `
      SELECT mc.*,
             m.name as module_name,
             c.name as company_name,
             COUNT(DISTINCT d.id) as department_count,
             COUNT(DISTINCT e.employee_id) as employee_count
      FROM module_company mc
      JOIN modules m ON mc.module_id = m.id
      JOIN companies c ON mc.company_id = c.company_id
      LEFT JOIN department d ON c.company_id = d.company_id
      LEFT JOIN employees e ON c.company_id = e.company_id
      WHERE mc.company_id = $1
      GROUP BY mc.id, m.name, c.name
      ORDER BY m.name
    `;
    const result = await db.query(query, [company_id]);
    return result.rows;
  }

  static async getCompaniesByModuleId(module_id){
    const query = `
      SELECT mc.*,
             m.name as module_name,
             c.name as company_name,
             c.tier,
             c.tenant_name,
             c.theme,
             COUNT(DISTINCT d.id) as department_count,
             COUNT(DISTINCT e.employee_id) as employee_count
      FROM module_company mc
      JOIN modules m ON mc.module_id = m.id
      JOIN companies c ON mc.company_id = c.company_id
      LEFT JOIN department d ON c.company_id = d.company_id
      LEFT JOIN employees e ON c.company_id = e.company_id
      WHERE mc.module_id = $1
      GROUP BY mc.id, m.name, c.name, c.tier, c.tenant_name, c.theme
      ORDER BY c.name    
    `;
    const result = await db.query(query, [module_id]);
    return result.rows;
  }
}

module.exports = ModuleCompanyModel;