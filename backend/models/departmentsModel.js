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

	static async getRolesByDepartmentId(d_id) {
		const result = await db.query(`
			SELECT r.*
			FROM roles r
			JOIN department_roles dr ON r.id = dr.role_id
			WHERE dr.department_id = $1;
		`, [d_id]);
		return result.rows;
	}
	
		// In Employees model
	static async getEmployeesByDepartmentId(d_id) {
		const result = await db.query(`
			SELECT e.*, p.name as position_name
			FROM employees e
			JOIN employee_department ed ON e.employee_id = ed.employee_id
			JOIN positions p ON e.position_id = p.position_id
			WHERE ed.department_id = $1;
		`, [d_id]);
		return result.rows;
	}

	static async getEmployeesWithRolesByDepartmentId(d_id) {
		const result = await db.query(`
			SELECT e.*, r.name as role_name, p.name as position_name
			FROM employees e
			JOIN employee_department ed ON e.employee_id = ed.employee_id
			JOIN users u ON e.employee_id = u.employee_id
			JOIN user_roles ur ON u.user_id = ur.user_id
			JOIN roles r ON ur.role_id = r.id
			JOIN department_roles dr ON r.id = dr.role_id
			JOIN positions p ON e.position_id = p.position_id
			WHERE ed.department_id = $1 AND dr.department_id = $1;
		`, [d_id]);
		return result.rows;
	}
}

module.exports = Departments;