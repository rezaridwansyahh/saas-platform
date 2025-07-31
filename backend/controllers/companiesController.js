const { getAllCompanies, getCompanyById, getCompanyByTenant, addCompany } = require('../models/companiesModel.js');

exports.fetchCompanies = async (req, res) => {
  try {
    const allEmployees = await getAllCompanies();
    res.status(200).json({ allEmployees });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.fetchCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    const companyById = await getCompanyById(id);

    if(!companyById) {
      return res.status(404).json({ message: 'Company Not Found' });
    }

    res.status(200).json({ companyById });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.createCompany = async (req, res) => {
  const { company_id, name, logo, tier, tenant_name, additional } = req.body;
  try {
    const newCompany = await addCompany(company_id, name, logo, tier, tenant_name, additional);

    res.status(201).json({
      message: 'Company created',
      company: newCompany
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.fetchCompanyByTenant = async (req, res) => {
  const tenant_name = req.tenant || 'undefined';

  try {
    const companyByTenant = await getCompanyByTenant(tenant_name);
    if (!companyByTenant) {
      return res.status(404).json({ message: 'Company Not Found' });
    }

    res.status(200).json({ companyByTenant });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
