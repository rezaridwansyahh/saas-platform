const db = require('../db/connection.js');


class Employee {
  static async getAll() {
    const result = await db.query(`
      SELECT * 
      FROM employees
    `);

    return result.rows;
  }

  static async getById(id) {
    const result = await db.query(`
      SELECT * 
      FROM employees 
      WHERE id = $1
    `, [id]);

    return result.rows[0];
  }

  static async getByCompanyId(companyId) {
    const result = await db.query(`
      SELECT * 
      FROM employees 
      WHERE company_id = $1
    `, [companyId]);
    
    return result.rows;
  }

  static async getByDepartmentId(department_id) {
    const result = await db.query(`
      SELECT e.*
      FROM employees e
      JOIN employees_departments ed ON e.id = ed.employee_id
      WHERE ed.department_id = $1
    `, [department_id]);

    return result.rows;
  }

  static async create(employeeData) {
    const { name, profile_picture, company_id, position_id } = employeeData

    const result = await db.query(`
      INSERT INTO employees (name, profile_picture, company_id, position_id) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `, [name, profile_picture, company_id, position_id]);
    
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query(`
      DELETE FROM employees 
      WHERE id = $1 
      RETURNING *
    `, [id]);

    return result.rows[0];
  }

  static async update(id, fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);

    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');

    const result = await db.query(`
      UPDATE employees 
      SET ${setClause} 
      WHERE id = $${keys.length + 1} 
      RETURNING *
    `, [...values, id]);

    return result.rows[0];
  }
}

module.exports = Employee;