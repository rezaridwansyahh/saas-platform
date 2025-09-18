const db = require('../db/connection.js');

class Departments {
	static async getAllDepartments() {
			const result = await db.query('SELECT * FROM department');
			return result.rows;
	}

  static async getDepartmentById(d_id) {
		const result = await db.query('SELECT * FROM department WHERE id = $1', [d_id]);
		return result.rows[0];
	}

	static async getDepartmentByCompanyId(companyId) {
		const result = await db.query(`
			SELECT *
			FROM department
			WHERE company_id = $1;
		`, [companyId]);
		return result.rows;
	}
	
	static async getByModuleId(module_id){
    const query = `
    SELECT 
      d.id AS department_id,
      d.name AS department_name,
      m.id AS module_id,
      m.name AS module_name
    FROM departments d
    JOIN modules_departments md ON d.id = md.department_id
    JOIN modules m ON md.module_id = m.id
    WHERE m.id = $1
    ORDER BY d.name		
    `;
    const result = await db.query(query, [module_id]);
    return result.rows;
  }

	static async addDepartment(name, companyId) {
		const result = await db.query (`
			INSERT INTO department (name, company_id)
			VALUES ($1, $2)
			RETURNING *;
		`, [name, companyId]);
		return result.rows[0];
	}

	static async deleteDepartmentByIdAndCompanyId(departmentId, companyId) {
		const result = await db.query(`
			DELETE FROM department
			WHERE id = $1 AND company_id = $2
			RETURNING *;
		`, [departmentId, companyId]);
		return result.rows[0];
	}

	static async updateDepartmentByIdAndCompanyId(departmentId, companyId, updatedName) {
		const result = await db.query(`
			UPDATE department
			SET name = $1
			WHERE id = $2 AND company_id = $3
			RETURNING *;
		`, [updatedName, departmentId, companyId]);
		return result.rows[0];
	}
}

module.exports = Departments;