const ModuleCompanyModel = require('../models/ModuleCompanyModel');


class ModuleCompanyController{
  static async getAll(req, res){
    try{
      const company = await ModuleCompanyModel.getAll();
      res.status(200).json({ 
        message: "module_company fetched successfully",
        company 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getAllWithDetail(req, res){
    try{
      const company = await ModuleCompanyModel.getAllWithDetail();
      res.status(200).json({ 
        message: "module_company with detail fetched successfully",
        company 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req, res){
    const { id } = req.params;
    try{
      const module_company = await ModuleCompanyModel.getById(id);
      if(!module_company){
        return res.status(404).json({ message: "Module Company not found" });
      }
      res.status(200).json({ 
        message: "module_company fetched successfully",
        module_company 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getByModuleId(req, res){
    const {module_id} = req.params;
    try{
      const company = await c

      const module_company = await ModuleCompanyModel.getByModuleId(module_id);
      if(!module_company){
        return res.status(404).json({ message: "Module Company not found" });
      }
      res.status(200).json({ 
        message: "module_company fetched successfully",
        company,
        module,
        module_company 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getByCompanyId(req, res){
    const { company_id } = req.params;
    try{
      const company = await c

      const module_company = await ModuleCompanyModel.getByCompanyId(company_id);
      if(!module_company){
        return res.status(404).json({ message: "Module Company not found" });
      }
      res.status(200).json({ 
        message: "module_company fetched successfully",
        company,
        module,
        module_company 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getByModuleIdAndCompanyId(req, res){
    const {module_id, company_id} = req.params;
    try{
      const module_company = await ModuleCompanyModel.getByModuleIdAndCompanyId(module_id, company_id);
      if(!module_company){
        return res.status(404).json({ message: "Module Company not found" });
      }
      res.status(200).json({ 
        message: "module_company fetched successfully",
        module_company 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async create(req, res){
    const { module_id, company_id } = req.body;
    if(!module_id || !company_id){
      return res.status(400).json({ message: "module_id and company_id are required" });
    }
    try{
      const newmodule_company = await ModuleCompanyModel.create({ module_id, company_id });
      res.status(201).json({
        message: "module_company has been created successfully", 
        newmodule_company 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res){
    const { id } = req.params;
    try{
      const deletedmodule_company = await ModuleCompanyModel.delete(id);
      if(!deletedmodule_company){
        return res.status(404).json({ message: "Module Company not found" });
      }
      res.status(200).json({ 
        message: "module_company has been deleted successfully",
        deletedmodule_company 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = ModuleCompanyController;