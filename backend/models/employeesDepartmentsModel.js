const db = require('../db/connection.js');

class EmployeesDepartments {
  static async getDepartmentsByEmployeeId(employeeId) {
    const result = await db.query(`
      SELECT d.*
      FROM department d
      JOIN employee_department ed ON d.id = ed.department_id
      WHERE ed.employee_id = $1
    `, [employeeId]);

    return result.rows;
  }

  static async getEmployeesByDepartmentId(departmentId) {
    const result = await db.query(`
      SELECT e.*
      FROM employees e
      JOIN employee_department ed ON e.id = ed.employee_id
      WHERE ed.department_id = $1
    `, [departmentId]);

    return result.rows;
  }
  
  static async assignEmployeeToDepartment(employeeId, departmentId) {
    const result = await db.query(`
      INSERT INTO employee_department (employee_id, department_id)
      VALUES ($1, $2)
      RETURNING *
    `, [employeeId, departmentId]);

    return result.rows[0];
  }

  static async removeEmployeeFromDepartment(employeeId, departmentId) {
    const result = await db.query(`
      DELETE FROM employees_departments
      WHERE employee_id = $1 AND department_id = $2
      RETURNING *
    `, [employeeId, departmentId]);

    return result.rows[0];
  }
}

module.exports = EmployeesDepartments;