const Departments = require('../models/departmentsModel.js');

class DepartmentController {
  static async fetchAllDepartments(req, res) {
    try {
      const departments = await Departments.getAllDepartments();
      res.status(200).json({ departments });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async fetchDepartmentById(req, res) {
    try {
      const department = await Departments.getDepartmentById(req.params.id);
      if (!department) {
        res.status(404).json({ message: "Department not found" });
      }

      res.status(200).json({ department });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async fetchRolesByDepartmentId(req, res) {
    try {
      const roles = await Departments.getRolesByDepartmentId(req.params.id);
      if (!roles || roles.length === 0) {
        return res.status(404).json({ message: "No roles found for this department" });
      }

      res.status(200).json({ roles });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async fetchEmployeesByDepartmentId(req, res) {
    try {
      const employees = await Departments.getEmployeesByDepartmentId(req.params.id);
      if (!employees || employees.length === 0) {
        return res.status(404).json({ message: "No employees found for this department" });
      }

      res.status(200).json({ employees });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async fetchEmployeesWithRolesByDepartmentId(req, res) {
    try {
      const employee_roles = await Departments.getEmployeesWithRolesByDepartmentId(req.params.id);
      if (!employee_roles || employee_roles.length === 0) {
        return res.status(404).json({ message: "No employees found for this department" });
      }

      res.status(200).json({ employee_roles });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = DepartmentController;