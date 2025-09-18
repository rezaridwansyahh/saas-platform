const db = require('../db/connection.js');

class Department {
	static async getAll() {
		const result = await db.query(`
			SELECT * 
			FROM departments
		`);

		return result.rows;
	}

  static async getById(id) {
		const result = await db.query(`
			SELECT * 
			FROM departments 
			WHERE id = $1
		`, [id]);

		return result.rows[0];
	}

	static async getByCompanyId(company_id) {
		const result = await db.query(`
			SELECT *
			FROM departments
			WHERE company_id = $1
		`, [company_id]);

		return result.rows;
	}

	static async getByPositionId(position_id) {
    const result = await db.query(`
      SELECT d.*
      FROM departments d
      JOIN departments_positions dp ON d.id = dp.department_id
      WHERE dp.position_id = $1
    `, [position_id]);

    return result.rows;
  }

	static async getByEmployeeId(employee_id) {
    const result = await db.query(`
      SELECT d.*
      FROM departments d
      JOIN employees_departments ed ON d.id = ed.department_id
      WHERE ed.employee_id = $1
    `, [employee_id]);

    return result.rows;
  }

	static async create(departmentData) {
		const { name, company_id } =  departmentData
		const result = await db.query (`
			INSERT INTO departments (name, company_id)
			VALUES ($1, $2)
			RETURNING *
		`, [name, company_id]);

		return result.rows[0];
	}

	static async delete(id) {
		const result = await db.query(`
			DELETE FROM departments
			WHERE id = $1
			RETURNING *
		`, [id]);

		return result.rows[0];
	}

	static async update(id, fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
		
    const setClause = keys.map((k, index) => `${k} = $${index + 1}`).join(', ');
    
    const result = await db.query(`
			UPDATE departments
			SET ${setClause}
			WHERE id = $${keys.length + 1}
			RETURNING *
    `, [...values, id, company_id]);
		
    return result.rows[0];
	}
}

module.exports = Department;