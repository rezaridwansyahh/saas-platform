const path = require('path');
const fs = require('fs');

const Companies = require('../models/companiesModel.js');
const Employees = require('../models/employeesModel.js');

class ImagesController {
  static async fetchLogoCompanyById(req, res) {
    const companyId = req.user.companyId;
    const { id } = req.params;

    try {
      const company = await getCompanyById(id);

      if (!company) {
        return res.status(404).json({ message: 'Company Not Found' });
      }

      if (company.company_id !== companyId) {
        return res.status(403).json({ message: "You do not have permission to access this company logo" });
      }

      const imagePath = path.resolve(
        'assets',
        `${company.tenant_name}_${id}`,
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

  static async fetchProfileImageByEmployeeId(req, res) {
    const companyId = req.user.companyId;
    const company =  await getCompanyById(companyId);
    const { id } = req.params;

    try {
      const employee = await getEmployeeById(id);

      if (!employee) {
        return res.status(404).json({ message: 'Employee Not Found' });
      }

      if (employee.company_id !== companyId) {
        return res.status(401).json({ message: "You do not have permission to access this employee's profile image" });
      }

      const imagePath = path.resolve(
        `assets`,
        `${company.tenant_name}_${companyId}`,
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