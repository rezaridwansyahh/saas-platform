const MenusModel = require('../models/menusModel.js');

class MenusController {
  static async getAllMenus(req, res){
    try{
      const menus = await MenusModel.getAllMenus();
      res.status(200).json({ menus });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getMenuById(req, res){
    const { id } = req.params;
    try{
      const menu = await MenusModel.getMenuById(id);
      if(!menu){
        return res.status(404).json({ message: "Menu not found"});
      }
      res.status(200).json({ menu });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async createMenu(req, res){
    const { name, module_id } = req.body;
    const moduleId = module_id || req.user?.moduleId;
    if(!moduleId){
      return res.status(400).json({ message: "module_id is required"});
    }
    try{
      const newMenu = await MenusModel.createMenu({ name, module_id});
      res.status(201).json({ newMenu });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async updateMenu(req, res){
    const { id } = req.params;
    const { name } = req.body;
    try{
      const updatedMenu = await MenusModel.updateMenu(id, { name });
      if(!updatedMenu){
        return res.status(404).json({ message: "Menu not found"});
      }
      res.status(200).json({ updatedMenu });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteMenu(req, res){
    const { id } = req.params;
    try{
      const deletedMenu = await MenusModel.deleteMenu(id);
      if(!deletedMenu){
        return res.status(404).json({ message: "Menu not found"});
      }
      res.status(200).json({ deletedMenu });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }
  
  static async getMenusByModule(req, res){
    const { module_id } = req.params;
    try{
      const menus = await MenusModel.getMenusByModuleId(module_id);
      res.status(200).json({ menus });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getMenusByCompany(req, res){
    const { company_id } = req.params;
    try{
      const menus = await MenusModel.getMenusByCompanyId(company_id);
      res.status(200).json({ menus });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = MenusController; 