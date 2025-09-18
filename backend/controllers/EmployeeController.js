const path = require('path');
const fs = require('fs');

const Employee = require('../models/EmployeeModel.js');
const Company = require('../models/CompanyModel.js');
const Position = require('../models/PositionModel.js');
const Department = require('../models/DepartmentModel.js');

class EmployeeController {
  static async getAll(req, res) {
    try {
      const employees = await Employee.getAll();

      res.status(200).json({ 
        message: "List all Employees",
        employees 
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const employee = await Employee.getById(id);

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.status(200).json({ 
        message: "List Employee by Id",
        employee 
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getByCompanyId(req, res) {
    const { company_id } = req.params;
    
    try {
      const employees = await Employee.getByCompanyId(company_id);

      if(!employees){
        return res.status(404).json({message: "No employees found"});
      }

      res.status(200).json({ 
        message: "List of Employees inside this Company",
        employees 
      });
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  }

  static async getByDepartmentId(req, res) {
    const { department_id } = req.params;

    try {
      const department = await Department.getById(department_id);

      if(!department) {
        return res.status(404).json({ message: "Department not found" });
      }

      const employees = await Employee.getByDepartmentId(department_id);

      res.status(200).json({ 
        message: "List of Employees inside this Department",
        department,
        employees
      })
      
    } catch(err) {
      res.status(500).json({message: err.message});
    }
  }

  static async create(req, res) {
    const company_id = req.user.company_id;
    const tenant = req.user.tenant;
    const { name, position_id } = req.body;
    const profile_picture = req.file;

    try {
      const position = await Position.getPositionById(position_id);

      if (!position || position.company_id !== company_id) {
        return res.status(403).json({ message: "Invalid position for this company" });
      }

      const newEmployee = await Employee.create(name, profile_picture.filename, company_id, position_id);
      const newFilename = `employee_${newEmployee.employee_id}.jpeg`;

      const folderPath = path.join(
        'assets',
        `${tenant}_${company_id}`,
        'employees'
      );

      const oldPath = path.join(folderPath, profile_picture.filename);
      const newPath = path.join(folderPath, newFilename);

      await fs.promises.rename(oldPath, newPath);
      const fieldPath = { profile_picture: path.join(
        'assets',
        `${tenant}_${company_id}`,
        'employees',
        newFilename
      ) };

      await Employee.update(newEmployee.employee_id, fieldPath);

      newEmployee.profile_picture = path.join(
        'assets',
        `${tenant}_${companyId}`,
        'employees',
        newFilename
      );

      res.status(201).json({
        message: "Employee created",
        newEmployee
      });

    } catch (err) {
      console.error("Employee creation failed:", err);
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    const companyId = req.user.companyId;
    const { id } = req.params;

    try{
      const employee = await Employee.getById(id);

      if(!employee) {
        return res.status(404).json({message: "Employee not found"});
      }

      if(employee.company_id !== companyId) {
        return res.status(403).json({message: "You do not have permission to delete this employee"});
      }
      
      await deleteEmployee(id);

      res.status(200).json({
        message: "Employee deleted",
        empoyee: {
          id: employee.employee_id,
          name: employee.name
        }
      })
    } catch(err){
      res.status(500).json({message: err.message})
    }
  }

  static async update(req, res) {
    const tenant = req.user.tenant;
    const companyId = req.user.companyId;
    const { id } = req.params;
    const { name, position_id } = req.body;
    const profilePictureFile = req.file;

    const updatedFields = {};

    if (name) updatedFields.name = name;
    if (position_id) updatedFields.position_id = position_id;
    if (profilePictureFile) {
      updatedFields.profile_picture = path.join(
        'assets',
        `${tenant}_${companyId}`,
        'employees',
        profilePictureFile.filename
      );
    };

    try {
      const employee = await Employee.getById(id);

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      if (employee.company_id !== companyId) {
        return res.status(403).json({ message: "You do not have permission to update this employee" });
      }

      // Only update if something changed
      const updatedEmployee = await Employee.update(id, updatedFields);

      res.status(200).json({
        message: "Employee updated",
        updatedEmployee
      });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = EmployeeController;