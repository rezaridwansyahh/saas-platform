const ModuleMenuModel = require('../models/module_menuModel.js');

class ModuleMenuController {
  static async getAllModuleMenus(req, res){
    try{
      const module_menus = await ModuleMenuModel.getAllModuleMenus();
      res.status(200).json({ module_menus });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getModuleMenuById(req, res){
    const { id } = req.params;
    try{
      const module_menu = await ModuleMenuModel.getModuleMenuById(id);
      if(!module_menu){
        return res.status(404).json({ message: "Module Menu not found" });
      }
      res.status(200).json({ module_menu });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async createModuleMenu(req, res){
    const { module_id, menu_id } = req.body;
    if(!module_id || !menu_id){
      return res.status(400).json({ message: "module_id and menu_id are required" });
    }
    try{
      const newModuleMenu = await ModuleMenuModel.createModuleMenu({ module_id, menu_id });
      res.status(201).json({ newModuleMenu });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async updateModuleMenu(req, res){
    const { id } = req.params;
    const { module_id, menu_id } = req.body;
    const fields = {};
    if(module_id) fields.module_id = module_id;
    if(menu_id) fields.menu_id = menu_id;
    try{
      const updatedModuleMenu = await ModuleMenuModel.updateModuleMenu(id, fields);
      if(!updatedModuleMenu){
        return res.status(404).json({ message: "Module Menu not found" });
      }
      res.status(200).json({ updatedModuleMenu });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteModuleMenu(req, res){
    const { id } = req.params;
    try{
      const deletedModuleMenu = await ModuleMenuModel.deleteModuleMenu(id);
      if(!deletedModuleMenu){
        return res.status(404).json({ message: "Module Menu not found" });
      }
      res.status(200).json({ deletedModuleMenu });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getModuleMenusByModuleId(req, res){
    const { module_id } = req.params;
    try{
      const module_menus = await ModuleMenuModel.getModuleMenusByModuleId(module_id);
      res.status(200).json({ module_menus });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getModuleMenusByMenuId(req, res){
    const { menu_id } = req.params;
    try{
      const module_menus = await ModuleMenuModel.getModuleMenusByMenuId(menu_id);
      res.status(200).json({ module_menus });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = ModuleMenuController;