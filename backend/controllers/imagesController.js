const { getCompanyById } = require('../models/companiesModel.js');
const { getEmployeeById } = require('../models/employeesModel.js');
const path = require('path');
const fs = require('fs');

exports.fetchLogoCompanyById = async (req, res) => {
  const companyId = req.user.companyId;
  const { id } = req.params;

  try {
    const companyById = await getCompanyById(id);

    if (!companyById) {
      return res.status(404).json({ message: 'Company Not Found' });
    }

    if (companyById.company_id !== companyId) {
      return res.status(403).json({ message: "You do not have permission to access this company logo" });
    }

    const imagePath = path.resolve(
      'assets',
      `${companyById.tenant_name}_${id}`,
      'logo.jpeg'
    );

    // Check if file exists
    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath);
    } else {
      res.status(404).json({ message: 'Image not found' });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}