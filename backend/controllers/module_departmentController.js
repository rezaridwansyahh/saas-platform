const ModuleDepartmentModel = require('../models/module_deparmentModel.js');

class ModuleDepartmentController{
  static async getAllModuleDepartment(req, res){
    try{
      const department = await ModuleDepartmentModel.getAllModuleDeparment();
      res.status(200).json({ department });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getModuleDepartmentById(req, res){
    const { id } = req.params;
    try{
      const department = await ModuleDepartmentModel.getModuleDepartmentById(id);
      if(!department){
        return res.status(404).json({ message: "Module Department not found" });
      }
      res.status(200).json({ department });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async createModuleDepartment(req, res){
    const { module_id, department_id } = req.body;
    if(!module_id || !department_id){
      return res.status(400).json({ message: "module_id and department_id are required" });
    }
    try{
      const newDepartment = await ModuleDepartmentModel.createModuleDepartment({ module_id, department_id });
      res.status(201).json({ newDepartment });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }
  static async updateModuleDepartment(req, res){
    const { id } = req.params;
    const { module_id, department_id } = req.body;
    const fields = {};

    if(module_id) fields.module_id = module_id;
    if(department_id) fields.department_id = department_id;
    try{
      const updatedDepartment = await ModuleDepartmentModel.updatemoduleDepartment(id, fields);
      if(!updatedDepartment){
        return res.status(404).json({ message: "Module Department not found" });
      }
      res.status(200).json({ updatedDepartment });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteModuleDepartment(req, res){
    const { id } = req.params;
    try{
      const deletedDepartment = await ModuleDepartmentModel.deleteModuleDepartment(id);
      if(!deletedDepartment){
        return res.status(404).json({ message: "Module Department not found" });
      }
      res.status(200).json({ deletedDepartment });
    }catch(err){
      res.status(500).json({ message})
    }
  }

  static async getModuleDepartmentByModuleId(req, res){
    const { module_id } = req.params;
    try{
      const department = await ModuleDepartmentModel.getModuleDepartmentsByModuleId(module_id);
      res.status(200).json({ department });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getModuleDepartmentsByDepartmentId(req, res){
    const { department_id } = req.params;
    try{
      const department = await ModuleDepartmentModel.getModuleDepartmentsByDepartmentId(department_id);
      res.status(200).json({ department });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = ModuleDepartmentController;