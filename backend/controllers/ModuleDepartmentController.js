const ModuleDepartmentModel = require('../models/ModuleDepartmentModel.js');

class ModuleDepartmentController{
  static async getAll(req, res){
    try{
      const department = await ModuleDepartmentModel.getAll();
      res.status(200).json({ 
        message: "department fetched successfully",
        department 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getAllWithDetails(req, res){
    try{
      const department = await ModuleDepartmentModel.getAllWithDetails();
      res.status(200).json({ 
        message: "department with details fetched successfully",
        department 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req, res){
    const { id } = req.params;
    try{
      const department = await ModuleDepartmentModel.getById(id);
      if(!department){
        return res.status(404).json({ message: "Module Department not found" });
      }
      res.status(200).json({
        message: "department fetched successfully",
        department 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getByModuleId(req, res){
    const { module_id } = req.params;
    try{
      const department = await ModuleDepartmentModel.getByModuleId(module_id);
      if(!department){
        return res.status(404).json({ message: "Module Department not found" });
      }
      res.status(200).json({
        message: "module_department fetched successfully",
        department 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getByDepartmentId(req, res){
    const {department_id } = req.params;
    try{
      const department = await ModuleDepartmentModel.getByDepartmentId(department_id);
      if(!department){
        return res.status(404).json({ message: "Module Department not found" });
      }
      res.status(200).json({
        message: "module_department fetched successfully",
        department 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getByModuleIdAndDepartmentId(req, res){
    const { module_id, department_id } = req.params;
    try{
      const department = await ModuleDepartmentModel.getByModuleIdAndDepartmentId(module_id, department_id);
      if(!department){
        return res.status(404).json({ message: "Module Department not found" });
      }
      res.status(200).json({
        message: "module_department fetched successfully",
        department 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async create(req, res){
    const { module_id, department_id } = req.body;
    if(!module_id || !department_id){
      return res.status(400).json({ message: "module_id and department_id are required" });
    }
    try{
      const newDepartment = await ModuleDepartmentModel.create({ module_id, department_id });
      res.status(201).json({ 
        message: "department has been created successfully",
        newDepartment 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }
  
  static async update(req, res){
    const { id } = req.params;
    const { module_id, department_id } = req.body;
    const fields = {};

    if(module_id) fields.module_id = module_id;
    if(department_id) fields.department_id = department_id;
    try{
      const updatedDepartment = await ModuleDepartmentModel.update(id, fields);
      if(!updatedDepartment){
        return res.status(404).json({ message: "Module Department not found" });
      }
      res.status(200).json({ 
        message: "department has been updated successfully",
        updatedDepartment 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res){
    const { id } = req.params;
    try{
      const deletedDepartment = await ModuleDepartmentModel.delete(id);
      if(!deletedDepartment){
        return res.status(404).json({ message: "Module Department not found" });
      }
      res.status(200).json({ 
        message: "department has been deleted successfully",        
        deletedDepartment 
      });
    }catch(err){
      res.status(500).json({ message})
    }
  }
}

module.exports = ModuleDepartmentController;