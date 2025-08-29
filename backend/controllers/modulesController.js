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
  
  static async getCompanyModules(req, res){
    const companyId = req.user.companyId;
    try{
      const modules = await ModulesModel.getModulesByCompanyId(companyId);
      res.status(200).json({ modules });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getUserModules(req, res){
    const userId = req.user.userId;
    try{
      const modules = await ModulesModel.getModulesByUserId(userId);
      res.status(200).json({ modules });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }


  static async getUserModulesWithMenus(req, res){
    const { id: moduleId } = req.params;
    const userId = req.user.userId;
    try{
      const modules = await ModulesModel.getUserModulesWithMenus(userId, moduleId);
      res.status(200).json({ modules });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async assignDepartmentToModule(req, res){
    const { id: moduleId } = req.params;
    const { departmentIds } = req.body;
    try{
      if(!departmentIds){
        return res.status(400).json({ message: "departmentIds is required" });
      }

      const result = await ModulesModel.assignDepartmentsToModule(moduleId, departmentIds);
      res.status(200).json({ message: "Departments assigned successfully", result });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async removeDepartmentFromModule(req, res){
    const { id: moduleId } = req.params;
    const { departmentId } = req.body;
    try{
      if(!departmentId){
        return res.status(400).json({ message: "departmentId is required" });
      }

      const result = await ModulesModel.removeDepartmentFromModule(moduleId, departmentId);
      res.status(200).json({ message: "Department removed successfully", result });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async mapMenuToModule(req, res){
    const { id: moduleId } = req.params;
    const { menuIds } = req.body;
    try{
      if(!menuIds){
        return res.status(400).json({ message: "menuIds is required" });
      }

      const result = await ModulesModel.mapMenusToModule(moduleId, menuIds);
      res.status(200).json({ message: "Menus mapped successfully", result });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = ModulesController;