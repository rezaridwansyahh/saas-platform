const path = require('path');
const fs = require('fs');

const Employees = require('../models/employeesModel.js');
const Companies = require('../models/companiesModel.js');
const Positions = require('../models/positionsModel.js');

class EmployeesController {
  static async fetchEmployeeId(req, res) {
    const companyId = req.user.companyId;
    const { id } = req.params;

    try {
      const employee = await Employees.getEmployeeById(id);

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      if (employee.company_id !== companyId) {
        return res.status(403).json({ message: "You do not have permission to access this employee" });
      }

      res.status(200).json({ employee });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async fetchEmployeeByCompanyId(req, res) {
    const tenant = req.tenant;
    const companyId = req.user.companyId;

    try {
      const company = await Companies.getCompanyById(companyId);

      if (companyId !== company.company_id) {
        return res.status(403).json({ message: "You do not have permission to access this company's employees" });
      }

      const employeeByCompanyId = await Employees.getEmployeeByCompanyId(companyId);

      if(!employeeByCompanyId){
        return res.status(404).json({message: "No employees found for this company"});
      }

      res.status(200).json({employeeByCompanyId});
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  }

  static async createEmployee(req, res) {
    const companyId = req.user.companyId;
    const tenant = req.user.tenant;
    const { name, position_id } = req.body;
    const profilePictureFile = req.file;

    try {
      const position = await Positions.getPositionById(position_id);

      if (!position || position.company_id !== companyId) {
        return res.status(403).json({ message: "Invalid position for this company" });
      }

      const newEmployee = await Employees.addEmployee(name, profilePictureFile.filename, companyId, position_id);
      const newFilename = `employee_${newEmployee.employee_id}.jpeg`;

      const folderPath = path.join(
        'assets',
        `${tenant}_${companyId}`,
        'employees'
      );

      const oldPath = path.join(folderPath, profilePictureFile.filename);
      const newPath = path.join(folderPath, newFilename);

      await fs.promises.rename(oldPath, newPath);
      const fieldPath = { profile_picture: path.join(
        'assets',
        `${tenant}_${companyId}`,
        'employees',
        newFilename
      ) };

      await Employees.editEmployee(newEmployee.employee_id, fieldPath);

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

  static async removeEmployee(req, res) {
    const companyId = req.user.companyId;
    const { id } = req.params;

    try{
      const employee = await Employees.getEmployeeById(id);

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

  static async updateEmployee(req, res) {
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
      const employee = await Employees.getEmployeeById(id);

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      if (employee.company_id !== companyId) {
        return res.status(403).json({ message: "You do not have permission to update this employee" });
      }

      // Only update if something changed
      const updatedEmployee = await Employees.editEmployee(id, updatedFields);

      res.status(200).json({
        message: "Employee updated",
        updatedEmployee
      });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = EmployeesController;