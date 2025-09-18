const ModuleMenuModel = require('../models/ModuleMenuModel');

class ModuleMenuController {
  static async getAll(req, res){
    try{
      const module_menus = await ModuleMenuModel.getAll();
      res.status(200).json({
        message: "module_menu fetched successfully", 
        module_menus 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req, res){
    const { id } = req.params;
    try{
      const module_menu = await ModuleMenuModel.getById(id);
      if(!module_menu){
        return res.status(404).json({ message: "Module Menu not found" });
      }
      res.status(200).json({ 
        message: "module_menu fetched successfully", 
        module_menu 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getbyModuleId(req, res){
    const { module_id } = req.params;
    try{
      const module_menus = await ModuleMenuModel.getbyModuleId(module_id);
      res.status(200).json({ 
        message: "module_id fetched successfully", 
        module_menus 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getbyMenuId(req, res){
    const { menu_id } = req.params;
    try{
      const menu = await this.getById;


      const module_menus = await ModuleMenuModel.getbyMenuId(menu_id);
      res.status(200).json({
        message: "module-menu fetched successfully", 
        menu,
        module_menus 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getbyModuleIdAndMenuId(req, res){
    const { module_id, menu_id } = req.params;
    try{
      const module_menus = await ModuleMenuModel.getbyModuleIdAndMenuId(module_id, menu_id);
      res.status(200).json({
        message: "module_id and menu_id fetched successfully", 
        module_menus 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async create(req, res){
    const { module_id, menu_id } = req.body;
    if(!module_id || !menu_id){
      return res.status(400).json({ message: "module_id and menu_id are required" });
    }
    try{
      const newModuleMenu = await ModuleMenuModel.create({ module_id, menu_id });
      res.status(201).json({ 
        message: "module_menu has been created successfully", 
        newModuleMenu 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async update(req, res){
    const { id } = req.params;
    const { module_id, menu_id } = req.body;
    const fields = {};
    if(module_id) fields.module_id = module_id;
    if(menu_id) fields.menu_id = menu_id;
    try{
      const updatedModuleMenu = await ModuleMenuModel.update(id, fields);
      if(!updatedModuleMenu){
        return res.status(404).json({ message: "Module Menu not found" });
      }
      res.status(200).json({ 
        message: "module_menu has been updated successfully", 
        updatedModuleMenu 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res){
    const { id } = req.params;
    try{
      const deletedModuleMenu = await ModuleMenuModel.delete(id);
      if(!deletedModuleMenu){
        return res.status(404).json({ message: "Module Menu not found" });
      }
      res.status(200).json({
        message: "module_menu has been deleted successfully", 
        deletedModuleMenu 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = ModuleMenuController;