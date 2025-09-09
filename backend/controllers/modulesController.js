const ModulesModel = require('../models/modulesModel.js');

class ModulesController {
  static async getAllModules(req, res){
    try{
      const modules = await ModulesModel.getAllModules();
      res.status(200).json({ modules });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getModulebyId(req, res){
    const { id } = req.params;
    try{
      const module = await ModulesModel.getModuleById(id);
      if(!module){
        return res.status(404).json({ message: "Module not found"});
      }
      res.status(200).json({ module });
    }catch(err){
      res.status(500).json({ message: err.message});
    }
  }

  static async createModule(req, res){
    const { name, company_id } = req.body;
    const companyId = company_id || req.user?.companyId;
    
    if (!companyId) {
      return res.status(400).json({ message: "company_id is required" });
    }
    
    try{
      const newModule = await ModulesModel.createModule(name, companyId);
      res.status(201).json({ newModule});
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async updateModule(req, res){
    const { id } = req.params;
    const { name } = req.body;
    try{
      const updatedModule = await ModulesModel.updateModule(id, { name });
      if(!updatedModule){
        return res.status(404).json({ message: "Module not found"});
      }
      res.status(200).json({ updatedModule });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteModule(req, res){
    const { id } = req.params;
    try{
      const deletedModule = await ModulesModel.deleteModule(id);
      if(!deletedModule){
        return res.status(404).json({ message: "Module not found"});
      }
      res.status(200).json({ deletedModule });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }
  
  static async getMenusByModuleId(req, res){
    const { id } = req.params;
    try{
      const menus = await ModulesModel.getMenusByModuleId(id);
      res.status(200).json({ menus });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  } 

}

module.exports = ModulesController;