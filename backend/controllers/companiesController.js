const Companies = require('../models/companiesModel.js');

class CompaniesController {
  static async fetchCompanies(req, res) {
    try {
      const allEmployees = await Companies.getAllCompanies();
      res.status(200).json({ allEmployees });
    } catch(error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async fetchCompanyById(req, res) {
    const { id } = req.params;
    try {
      const companyById = await Companies.getCompanyById(id);

      if(!companyById) {
        return res.status(404).json({ message: 'Company Not Found' });
      }

      res.status(200).json({ companyById });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async fetchCompanyByTenant(req, res) {
    const tenant_name = req.tenant || 'undefined';

    try {
      const companyByTenant = await Companies.getCompanyByTenant(tenant_name);
      if (!companyByTenant) {
        return res.status(404).json({ message: 'Company Not Found' });
      }

      res.status(200).json({ companyByTenant });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async createCompany(req, res) {
    const { company_id, name, logo, tier, tenant_name, additional } = req.body;

    try {
      const newCompany = await Companies.addCompany(company_id, name, logo, tier, tenant_name, additional);

      res.status(201).json({
        message: 'Company created',
        company: newCompany
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteCompany(req, res) {
    try {
      const id = req.params.id;

      const checkCompany = await Companies.getCompanyById(id);
      
      if (!checkCompany) {
        return res.status(404).json({ message: 'Company Not Found' });
      }

      const result = await Companies.removeCompany(id);

      res.status(204).json({
        message: 'Company Deleted',
        company: {
          name: checkCompany.name,
          id: checkCompany.company_id,
          tier: checkCompany.tier,
          tenant: checkCompany.tenant_name
        }
      })
    } catch(error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      });
    }
  }

  static async updateCompany(req, res) {
    try {
      const { fields } = req.body;
      const id = req.params.id;

      const updatedCompany = await Companies.updateCompany(id, fields);

      if (!updatedCompany) {
        return res.status(404).json({ message: 'Company Not Found' });
      }

      res.status(200).json({
        message: 'Company Updated',
        company: updatedCompany
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      });
    }
  }
}

module.exports = CompaniesController;