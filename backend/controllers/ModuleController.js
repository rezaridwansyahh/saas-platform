const ModulesModel = require('../models/ModuleModel.js');
const ModuleCompanyModel = require('../models/ModuleModel.js');
const ModuleDepartmentModel = require('../models/ModuleDepartmentModel.js');

class ModulesController {
  static async getAll(req, res){
    try{
      const modules = await ModulesModel.getAll();
      res.status(200).json({ 
        message: "Module fetched successfully",
        modules
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req, res){
    const { id } = req.params;
    try{
      const module = await ModulesModel.getById(id);    
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

  static async getByCompanyId(req, res){
    const { id } = req.params;
    try{
      const module_company = await ModuleCompanyModel.getById(id);    
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

  static async getByDepartmentId(req, res){
    const { id } = req.params;
    try{
      const module_deparment = await ModuleDepartmentModel.getById(id);    
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

  static async getByCompanyIdAndDepartmentId(req, res){
    const { company_id, department_id } = req.params;
    try{
      const allId = ModulesController.getBydepartmentIdAndCompanyId(company_id, department_id);
      if(!allId){
        return res.status(404).json({ message: "company_id and department_id not found"});
      }
      res.status(200).json({
        message: "module_company and module_deparment fetched successfully",
        module_deparment
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
         module
        });
    }catch(err){
      res.status(500).json({ message: err.message});
    }
  }

  static async create(req, res){
    const { name, company_id, department_id} = req.body;
    const companyId = company_id || req.user?.companyId;
    
    if (!companyId) {
      return res.status(400).json({ message: "company_id is required" });
    }
    
    try{
      const newModule = await ModulesModel.create(name);

      const newModuleCompany = await ModuleCompanyModel.create(newModule.id, companyId);

      const newModuleDepartment = await ModuleDepartmentModel.create(newModule.id, department_id);
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

  static async update(req, res){
    const { id } = req.params;
    const { name } = req.body;
    try{
      const updatedModule = await ModulesModel.update(id, { name });
      if(!updatedModule){
        return res.status(404).json({ message: "Module not found"});
      }
      res.status(200).json({ 
        message: "module has been updated successfully",
        updatedModule
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res){
    const { id } = req.params;
    try{
      const deletedModule = await ModulesModel.delete(id);
      if(!deletedModule){
        return res.status(404).json({ message: "Module not found"});
      }
      res.status(200).json({ 
        message: "module has been deleted successfully",
        deletedModule 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

}

module.exports = ModulesController;