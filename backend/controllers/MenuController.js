const MenusModel = require('../models/MenuModel');

class MenusController {
  static async getAll(req, res){
    try{
      const role = req.user.roleId;

      const menus = await MenusModel.getAll();
      res.status(200).json({ 
        message: "menus fetched successfully",
        menus 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req, res){
    const { id } = req.params;
    try{
      const menu = await MenusModel.getById(id);
      if(!menu){
        return res.status(404).json({ message: "Menu not found"});
      }
      res.status(200).json({ 
        message: "menus fetched successfully",
        menu 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }
  
  static async getByModuleId(req, res){
    const { module_id } = req.params;
    try{
      const menus = await MenusModel.getByModuleId(module_id);
      res.status(200).json({ 
        message: "menus has been deleted successfully",
        menus 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }
  
  static async create(req, res){
    const { name, module_id } = req.body;
    const moduleId = module_id || req.user?.moduleId;
    if(!moduleId){
      return res.status(400).json({ message: "module_id is required"});
    }
    try{
      const newMenu = await MenusModel.create({ name, module_id });
      res.status(201).json({
        message: "menus has been created successfully",
        newMenu 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async update(req, res){
    const { id } = req.params;
    const { name } = req.body;
    try{
      const updatedMenu = await MenusModel.updateMenu(id, { name });
      if(!updatedMenu){
        return res.status(404).json({ message: "Menu not found"});
      }
      res.status(200).json({
        message: "menus has been updated successfully",
        updatedMenu 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res){
    const { id } = req.params;
    try{
      const deletedMenu = await MenusModel.delete(id);
      if(!deletedMenu){
        return res.status(404).json({ message: "Menu not found"});
      }
      res.status(200).json({ 
        message: "menus has been deleted successfully",
        deletedMenu 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }
  
}

module.exports = MenusController; 