const ModulesModel = require('../models/modulesModel.js');
const ModuleCompanyModel = require('../models/module_companyModel.js');
const ModuleDepartmentModel = require('../models/module_deparmentModel.js');

class ModulesController {
  static async getAllModules(req, res){
    try{
      const modules = await ModulesModel.getAllModules();
      const moduleCompany = await ModuleCompanyModel.getAllModuleCompanies();
      const moduleDepartment = await ModuleDepartmentModel.getAllModuleDeparment();
      res.status(200).json({ 
        message: "Module fetched successfully",
        modules
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getAllModulesCompany(req, res){
    try{
      const moduleCompany = await ModuleCompanyModel.getAllModuleCompanies();
      res.status(200).json({ 
        message: "Module_company fetched successfully",
        moduleCompany
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getAllModulesDepartment(req, res){
    try{
      const moduleDepartment = await ModuleDepartmentModel.getAllModuleDeparment();
      res.status(200).json({ 
        message: "module_deparment fetched successfully",
        moduleDepartment
      });
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
      res.status(200).json({
        message: "module fetched successfully",
        module
        });
    }catch(err){
      res.status(500).json({ message: err.message});
    }
  }

  static async getModuleCompanybyId(req, res){
    const { id } = req.params;
    try{
      const module_company = await ModuleCompanyModel.getModuleCompanyById(id);    
      if(!module_company){
        return res.status(404).json({ message: "Module_company not found"});
      }
      res.status(200).json({
        message: "module_company fetched successfully",
        module_company
        });
    }catch(err){
      res.status(500).json({ message: err.message});
    }
  }

  static async getModuleDeparmentbyId(req, res){
    const { id } = req.params;
    try{
      const module_deparment = await ModuleDepartmentModel.getModuleDepartmentById(id);    
      if(!module_deparment){
        return res.status(404).json({ message: "module_deparment not found"});
      }
      res.status(200).json({
        message: "module_deparment fetched successfully",
         module_deparment
        });
    }catch(err){
      res.status(500).json({ message: err.message});
    }
  }
  static async getModulebyId(req, res){
    const { id } = req.params;
    try{
      const module = await ModulesModel.getModuleById(id);    
      if(!module){
        return res.status(404).json({ message: "Module not found"});
      }
      res.status(200).json({
         module
        });
    }catch(err){
      res.status(500).json({ message: err.message});
    }
  }

  static async createModule_company_depatment(req, res){
    const { name, company_id, department_id} = req.body;
    const companyId = company_id || req.user?.companyId;
    
    if (!companyId) {
      return res.status(400).json({ message: "company_id is required" });
    }
    
    try{
      const newModule = await ModulesModel.createModule(name);

      const newModuleCompany = await ModuleCompanyModel.createModuleCompany(newModule.id, companyId);

      const newModuleDepartment = await ModuleDepartmentModel.createModuleDepartment(newModule.id, department_id);
      res.status(201).json({ 
        message: "added new module, add to module_company and add to module_deparment",
        newModule,
        newModuleCompany,
        newModuleDepartment 
      }); 

    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async updateModule(req, res){
    const { id } = req.params;
    const { name } = req.body;
    try{
      const updatedModule = await ModulesModel.updateModule(id, { name });
      if(!updatedModule && !updatedModuleCompany && !updatedModuleDepartment){
        return res.status(404).json({ message: "Module not found"});
      }
      res.status(200).json({ 
        message: "Updated module, module_company & module_deparment",
        updatedModule
      });
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