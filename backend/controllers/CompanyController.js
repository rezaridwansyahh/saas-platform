const Company = require('../models/CompanyModel.js');
const Module = require('../models/ModuleModel.js');

class CompanyController {
  static async getAll(req, res) {
    try {
      const companies = await Company.getAll();
      console.log(req.user);
      
      res.status(200).json({ 
        message: "List all Companies",
        companies 
      });
    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const company = await Company.getById(id);

      if(!company) {
        return res.status(404).json({ message: 'Company Not Found' });
      }

      res.status(200).json({ 
        message: "List Company by id",
        company 
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getByModuleId(req, res) {
    const { module_id } = req.params;

    try {
      const module = await Module.getById(module_id);

      if (!module) {
        return res.status(404).json({ message: 'Module Not Found' });
      }

      const companies = await Company.getByModuleId(module_id);
      
      if (!companies || companies.length === 0) {
        return res.status(404).json({ message: 'No Companies Found for this Module' });
      }

      res.status(200).json({ 
        message: "List Companies by module_id",
        companies
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getByTenantName(req, res) {
    const tenant_name = req.tenant || 'undefined';

    try {
      const company = await Company.getByTenantName(tenant_name);
      
      if (!company) {
        return res.status(404).json({ message: 'Company Not Found' });
      }

      res.status(200).json({ 
        message: "List Company by tenant_name",
        company
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async create(req, res) {
    const { id, name, logo, tier, tenant_name, additional } = req.body;

    try {
      if(!name || !tenant_name) {
        return res.status(400).json({ 
          message: 'Name and tenant_name are required' 
        });
      }

      const newCompany = await Company.create(id, name, logo, tier, tenant_name, additional);
      res.status(201).json({
        message: 'Company created',
        company: newCompany
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;

    try {
      const existingCompany = await Company.getById(id);
      
      if (!existingCompany) {
        return res.status(404).json({ message: 'Company Not Found' });
      }

      const deletedCompany = await Company.delete(id);

      res.status(200).json({
        message: 'Company deleted',
        company: deletedCompany
      })
    } catch(error) {
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
        });
      }

      const existingCompany = await Company.getById(id);

      if (!existingCompany) {
        return res.status(404).json({ message: 'Company Not Found' });
      }

      const updatedCompany = await Company.update(id, fields);

      res.status(200).json({
        message: 'Company updated',
        company: updatedCompany
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = CompanyController;