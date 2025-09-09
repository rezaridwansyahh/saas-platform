const ModuleCompanyModel = require('../models/module_companyModel.js');

class ModuleCompanyController{
  static async getAllModuleCompany(req, res){
    try{
      const company = await ModuleCompanyModel.getAllModuleCompanies();
      res.status(200).json({ company });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getModuleCompanyById(req, res){
    const { id } = req.params;
    try{
      const module_company = await ModuleCompanyModel.getModuleCompanyById(id);
      if(!module_company){
        return res.status(404).json({ message: "Module Company not found" });
      }
      res.status(200).json({ module_company });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async createModuleCompany(req, res){
    const { module_id, company_id } = req.body;
    if(!module_id || !company_id){
      return res.status(400).json({ message: "module_id and company_id are required" });
    }
    try{
      const newmodule_company = await ModuleCompanyModel.createModuleCompany({ module_id, company_id });
      res.status(201).json({ newmodule_company });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async updateModuleCompany(req, res){
    const { id } = req.params;
    const { module_id, company_id } = req.body;
    const fields = {};
    if(module_id) fields.module_id = module_id;
    if(company_id) fields.company_id = company_id;
    try{
      const updatedmodule_company = await ModuleCompanyModel.updateModuleCompany(id, fields);
      if(!updatedmodule_company){
        return res.status(404).json({ message: "Module Company not found" });
      }
      res.status(200).json({ updatedmodule_company });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }
  static async deleteModuleCompany(req, res){
    const { id } = req.params;
    try{
      const deletedmodule_company = await ModuleCompanyModel.deleteModuleCompany(id);
      if(!deletedmodule_company){
        return res.status(404).json({ message: "Module Company not found" });
      }
      res.status(200).json({ deletedmodule_company });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getModuleCompanyByCompanyId(req, res){
    const { company_id } = req.params;
    try{
      const company = await ModuleCompanyModel.getModulesByCompanyId(company_id);
      res.status(200).json({ 
        messaqge: "Module Company fetched successfully",
        company
       });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getModuleCompanyByModuleId(req, res){
    const { module_id } = req.params;
    try{
      const company = await ModuleCompanyModel.getCompaniesByModuleId(module_id);
      res.status(200).json({ message: "Module Company fetched successfully",
        company });

    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = ModuleCompanyController;