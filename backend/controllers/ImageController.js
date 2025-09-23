const path = require('path');
const fs = require('fs');

const Company = require('../models/CompanyModel.js');
const Employee = require('../models/EmployeeModel.js');
const { CONNREFUSED } = require('dns');

class ImagesController {
  static async getByCompanyId(req, res) {
    const { company_id } = req.params;

    try {
      const company = await Company.getById(company_id);

      const imagePath = path.resolve(
        'assets',
        `${company.tenant_name}_${company_id}`,
        'logo.jpeg'
      );

      if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
      } else {
        res.status(404).json({ message: 'Image not found' });
      }

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getByEmployeeId(req, res) {
    const { employee_id } = req.params;

    try {
      const employee = await Employee.getEmployeeById(employee_id);
      const company = await Company.getByCompanyId(employee.company_id);

      if (!employee) {
        return res.status(404).json({ message: 'Employee Not Found' });
      }

      const imagePath = path.resolve(
        `assets`,
        `${company.tenant_name}_${company.id}`,
        `employees`,
        `employee_${id}.jpeg`
      )

      if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
      } else {
        res.status(404).json({ message: 'Image not found' });
      }

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = ImagesController;