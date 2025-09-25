const Company = require('../models/CompanyModel.js');
const Department = require('../models/DepartmentModel.js');
const Menu = require('../models/MenuModel.js');
const Module = require('../models/ModuleModel.js');

const ModuleCompany = require('../models/ModuleCompanyModel.js');
const ModuleDepartment = require('../models/ModuleDepartmentModel.js');

class ModulesController {
  static async getAll(req, res){
    try {
      const modules = await Module.getAll();

      res.status(200).json({ 
        message: "List all Modules",
        modules
      });
    } catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req, res){
    const { id } = req.params;
    
    try {
      const module = await Module.getById(id);    
      
      if(!module){
        return res.status(404).json({ message: "Module not found"});
      }

      res.status(200).json({
        message: "List Module by Id",
        module
        });
    } catch(err){
      res.status(500).json({ message: err.message});
    }
  }

  static async getByCompanyId(req, res) {
    const { company_id } = req.params;
    
    try {
      const company = await Company.getById(company_id);

      if (!company) {
        return res.status(404).json({ message: 'Company Not Found' });
      }

      const modules = await Module.getByCompanyId(company_id);

      res.status(200).json({ 
        message: "List all Modules inside this Company",
        modules 
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getByDepartmentId(req, res) {
    const { department_id } = req.params;
    
    try {
      const department = await Department.getById(department_id);

      if (!department) {
        return res.status(404).json({ message: 'Department Not Found' });
      }

      const modules = await Module.getByDepartmentId(department_id);

      res.status(200).json({ 
        message: "List all Modules inside this Department",
        department,
        modules 
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getByMenuId(req, res) {
    const { menu_id } = req.params;
    
    try {
      const menu = await Menu.getById(menu_id);

      if (!menu) {
        return res.status(404).json({ message: 'Menu Not Found' });
      }

      const modules = await ModuleMenu.getByMenuId(menu_id);

      res.status(200).json({ 
        message: "List all Modules contain this Menu",
        menu,
        modules 
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async create(req, res){
    const { name } = req.body;
    const company_id = req.user?.company_id;    
    
    try{
      const newModule = await Module.create(name);

      const newModuleCompany = await ModuleCompany.create(newModule.id, company_id);

      res.status(201).json({ 
        message: "added new module and add to module_company",
        newModule,
        newModuleCompany
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async update(req, res){
    const { id } = req.params;
    const { name } = req.body;
    try{
      const updatedModule = await Module.update(id, { name });
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
      const deletedModule = await Module.delete(id);
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