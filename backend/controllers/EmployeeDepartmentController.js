const Department = require('../models/DepartmentModel.js');
const EmployeeDepartment = require('../models/EmployeeDepartmentModel.js');
const Employee = require('../models/EmployeeModel.js');

class EmployeeDepartmentController {
  static async getAll(req, res) {
    try {
      const employeesDepartments = await EmployeeDepartment.getAll();

      res.status(200).json({ 
        message: "List all Employees-Departments with details",
        employeesDepartments });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getAllWithDetails(req, res) {
    try {
      const employeesDepartments = await EmployeeDepartment.getAllWithDetails();

      res.status(200).json({ 
        message: "List all Employees-Departments with details",
        employeesDepartments 
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const employeeDepartment = await EmployeeDepartment.getById(id);
      
      res.status(200).json({ 
        message: 'List Employee-Department by Id',
        employeeDepartment
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getByEmployeeId(req, res) {
    const { employee_id } = req.params;

    try {
      const employee = await Employee.getById(employee_id);

      if(!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      const employeeDepartments = await EmployeeDepartment.getByEmployeeId(employee_id);

      res.status(200).json({
        message: "List of Employee-Departments by Employee",
        employee,
        employeeDepartments
       });

    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getByDepartmentId(req, res) {
    const { department_id } = req.params;

    try {
      const department = await Department.getById(department_id);

      if(!department) {
        return res.status(404).json({ message: "Department not found" });
      }

      const employeesDepartment = await EmployeeDepartment.getByDepartmentId(department_id);

      res.status(200).json({
        message: "List of Employees-Department by Department",
        department,
        employeesDepartment
       });

    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getByEmployeeAndDepartment(req, res) {
    const { employee_id, department_id } = req.body;

    try {
      const employee = await Employee.getById(employee_id);

      if(!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      const department = await Department.getById(department_id);

      if(!department) {
        return res.status(404).json({ message: "Department not found" });
      }

      const employeeDepartment = await EmployeeDepartment.getByEmployeeAndDepartment(employee_id, department_id);

      if(!employeeDepartment) {
        return res.status(404).json({ message: "EmployeeDepartment not found" });
      }

      res.status(200).json({ 
        message:"List of Employee-Department by Employee and Department",
        employee,
        department,
        employeeDepartment });
    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  }
  
  static async create(req, res) {
    const { employee_id, department_id } = req.body;

    try {
      const employeeDepartment = await EmployeeDepartment.create(employee_id, department_id);

      res.status(201).json({ 
        message: 'Employee assigned to department',
        employeeDepartment 
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    const { employee_id, department_id } = req.body;

    try {
      const employeeDepartment = await EmployeesDepartments.removeEmployeeFromDepartment(employee_id, department_id);

      res.status(200).json({ 
        message: 'Employee removed from department',
        employeeDepartment
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = EmployeeDepartmentController;