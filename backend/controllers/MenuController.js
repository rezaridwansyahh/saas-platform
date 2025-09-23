const MenuModel = require('../models/MenuModel');
const ModuleModel = require('../models/ModuleModel');

class MenuController {
  static async getAll(req, res){
    try { 
      const menus = await MenuModel.getAll();

      res.status(200).json({ 
        message: "List of all Menus",
        menus 
      });
    } catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req, res){
    const { id } = req.params;

    try {
      const menu = await MenuModel.getById(id);

      if(!menu){
        return res.status(404).json({ message: "Menu not found"});
      }
      
      res.status(200).json({ 
        message: "List of Menu by Id",
        menu 
      });
    } catch(err){
      res.status(500).json({ message: err.message });
    }
  }
  
  static async getByModuleId(req, res){
    const { module_id } = req.params;

    try {
      const module = await ModuleModel.getById(module_id);

      if(!module) {
        return res.status(404).json({ message: "Module not found" });
      }

      const menus = await MenuModel.getByModuleId(module_id);

      res.status(200).json({ 
        message: "List of Menus by Module Id",
        module,
        menus 
      });
    } catch(err){
      res.status(500).json({ message: err.message });
    }
  }
  
  static async create(req, res){
    const { name, module_id } = req.body;

    if(!module_id){
      return res.status(400).json({ message: "module_id is required"});
    }
    try {
      const newMenu = await MenuModel.create({ name, module_id });

      res.status(201).json({
        message: "Menu created",
        newMenu 
      });
    } catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async update(req, res){
    const { id } = req.params;
    const { name } = req.body;

    try {
      const updatedMenu = await MenuModel.updateMenu(id, { name });

      if(!updatedMenu){
        return res.status(404).json({ message: "Menu not found"});
      }

      res.status(200).json({
        message: "Menu updated",
        updatedMenu 
      });
    } catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res){
    const { id } = req.params;

    try {
      const deletedMenu = await MenuModel.delete(id);
      if(!deletedMenu){
        return res.status(404).json({ message: "Menu not found"});
      }
      res.status(200).json({ 
        message: "Menu deleted",
        deletedMenu 
      });
    } catch(err){
      res.status(500).json({ message: err.message });
    }
  }
  
}

module.exports = MenuController; 
