const EmployeesDepartments = require('../models/employeesDepartmentsModel.js');

class EmployeesDepartmentsController {
  static async fetchDepartmentsByEmployeeId(req, res) {
    const { employeeId } = req.params;

    try {
      const departments = await EmployeesDepartments.getDepartmentsByEmployeeId(employeeId);

      res.status(200).json({ 
        message: 'Departments fetched successfully',
        departments 
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async fetchEmployeesByDepartmentId(req, res) {
    const { departmentId } = req.params;
    
    try {
      const employees = await EmployeesDepartments.getEmployeesByDepartmentId(departmentId);

      res.status(200).json({ 
        message: 'Employees fetched successfully',
        employees 
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  static async assignEmployeeToDepartment(req, res) {
    const { employeeId, departmentId } = req.body;

    try {
      const assigned = await EmployeesDepartments.assignEmployeeToDepartment(employeeId, departmentId);

      res.status(201).json({ 
        message: 'Employee assigned to department successfully',
        assigned 
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async removeEmployeeFromDepartment(req, res) {
    const { employeeId, departmentId } = req.body;

    try {
      const removed = await EmployeesDepartments.removeEmployeeFromDepartment(employeeId, departmentId);

      res.status(200).json({ 
        message: 'Employee removed from department successfully',
        removed
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = EmployeesDepartmentsController;