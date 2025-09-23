const db = require('../db/connection.js');

class EmployeeDepartment {
  static async getAll() {
    const result = await db.query(`
      SELECT * 
      FROM employees_departments
    `);

    return result.rows; 
  }

  static async getAllWithDetails() {
    const result = await db.query(`
      SELECT 
        ed.*,
        e.name as employee_name,
        d.name as department_name
      FROM employees_departments ed
      JOIN employees e ON ed.employee_id = e.id
      JOIN departments d ON ed.department_id = d.id
    `);
    
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query(`
      SELECT * 
      FROM employees_departments
      WHERE id = $1
    `, [id]);

    return result.rows;
  }

  static async getByEmployeeId(employee_id) {
    const result = await db.query(`
      SELECT * 
      FROM employees_departments
      WHERE department_id = $1
    `, [employee_id]);

    return result.rows;
  }

  static async getByDepartmentId(department_id) {
    const result = await db.query(`
      SELECT * 
      FROM employees_departments
      WHERE department_id = $1
    `, [department_id]);

    return result.rows;
  }

  static async getByEmployeeAndDepartment(employee_id, department_id) {
    const result = await db.query(`
      SELECT 
        ed.*,
        e.name as employee_name,
        d.name as department_name
      FROM employees_departments ed
      JOIN employees e ON ed.employee_id = e.id
      JOIN departments d ON ed.department_id = d.id
      WHERE ed.employee_id = $1 AND ed.department_id = $2
    `, [employee_id, department_id]);
    return result.rows[0];
  }

  static async create(employee_id, department_id) {
    const result = await db.query(`
      INSERT INTO employees_departments (employee_id, department_id)
      VALUES ($1, $2)
      RETURNING *
    `, [employee_id, department_id]);

    return result.rows[0];
  }

  static async delete(employee_id, department_id) {
    const result = await db.query(`
      DELETE FROM employees_departments
      WHERE employee_id = $1 AND department_id = $2
      RETURNING *
    `, [employee_id, department_id]);

    return result.rows[0];
  }

}

module.exports = EmployeeDepartment;