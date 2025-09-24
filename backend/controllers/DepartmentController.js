const Company = require('../models/CompanyModel.js');
const Department = require('../models/DepartmentModel.js');
const Employee = require('../models/EmployeeModel.js');
const Position = require('../models/PositionModel.js');

class DepartmentController {
  static async getAll(req, res) {
    try {
      const departments = await Department.getAll();

      res.status(200).json({ 
        message: "List all Departments",
        departments 
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req, res) {  
    const { id } = req.params;

    try {
      const department = await Department.getById(id);

      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }

      res.status(200).json({ 
        message: "List Department by Id",
        department 
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getByCompanyId(req, res) {
    const { company_id } = req.params;

    try {
      const company = await Company.getById(company_id);

      if(!company) {
        return res.status(404).json({ message: "Company not found" });
      }

      const departments = await Department.getByCompanyId(company_id);

      res.status(200).json({ 
        message: "List of Departments inside this Company",
        company,
        departments 
      });
    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getByPositionId(req, res) {
    const { position_id } = req.params;

    try {
      const position = await Position.getById(position_id);

      if(!position) {
        return res.status(404).json({ message: "Position not found"});
      }

      const departments = await Department.getByPositionId(position_id);

      res.status(200).json({
        message: "List of Departments contain this Position",
        position,
        departments
      });
    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getByEmployeeId(req, res) {
    const { employee_id } = req.params;

    try {
      const employee = await Employee.getById(employee_id);

      if(!employee) {
        return res.status(404).json({ message: "Employee not found"});
      }

      const departments = await Department.getByEmployeeId(employee_id);

      res.status(200).json({
        message: "List of Departments contain this Employee",
        employee,
        departments
      });
    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async create(req, res) {
    const { name, company_id } = req.body;

    try {
      if (!name) {
        return res.status(400).json({ message: "Department name is required" });
      }

      const newDepartment = await Department.create(name, company_id);

      res.status(201).json({ 
        message: "Department created", 
        department: newDepartment 
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;

    try {
      const existingDepartment = await Department.getById(id);

      if(!existingDepartment) {
        return res.status(404).json({ message: "Department not found" });
      }

      const deletedDepartment = await Department.delete(id);

      res.status(200).json({ 
        message: "Department deleted",
        department: deletedDepartment 
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const fields = req.body;

    try {
      if(!fields || fields.length == 0) {
        return res.status(400).json({ 
          message: 'No fields provided for update' 
        })
      }

      const existingDepartment = await Department.getById(id);

      if(!existingDepartment) {
        return res.status(404).json({ message: "Department not found" })
      }

      const updatedDepartment = await Department.update(id, fields);

      res.status(200).json({
        message: "Department updated",
        department: updatedDepartment
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = DepartmentController;