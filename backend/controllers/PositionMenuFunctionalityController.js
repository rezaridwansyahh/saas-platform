const PositionMenuFunctionality = require('../models/PositionMenuFunctionalityModel');

class PositionMenuFunctionalityController {
  static async getAll(req, res){
    try{
      const functionality = await PositionMenuFunctionality.getAll();
      res.status(200).json({
        message: "positions_menus_functionalities fetched successfully", 
        functionality 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req, res){
    const { role_id, module_menu_id } = req.params;
    try {
      const functionality = await PositionMenuFunctionality.getById(role_id, module_menu_id);
      if(!functionality){
        return res.status(404).json({ message: "Role Menu Functionality not found" });
      }
      res.status(200).json({ 
        message: "positions_menus_functionalities fetched successfully", 
        functionality 
      });
    }catch(err){
      res.status(500).json({ message: err.message});
    }
  }
  
  static async getByPositionId(req, res){
    const { role_id } = req.params;
    try{
      const functionality = await PositionMenuFunctionality.getByPositionId(role_id);
      res.status(200).json({ 
        message: "position_id fetched successfully", 
        functionality 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getByModuleMenuId(req, res){
    const { module_menu_id } = req.params;
    try{
      const functionality = await PositionMenuFunctionality.getByModuleMenuId(module_menu_id);
      res.status(200).json({ 
        message: "module_menu_id fetched successfully", 
        functionality 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }    
  }

  static async getByPositionIdAndModuleMenuId(req, res){
    const { position_id,module_menu_id } = req.params;
    try{
      const functionality = await PositionMenuFunctionality.getByPositionIdAndModuleMenuId(position_id,module_menu_id);
      res.status(200).json({
        message: "position_id and module_menu_id fetched successfully", 
        functionality 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }    
  }

  static async create(req, res){
    const { role_id, module_menu_id, functionality, additional } = req.body;
    if(!role_id || !module_menu_id || !functionality){
      return res.status(400).json({ message: "role_id, module_menu_id and functionality are required" });
    }
    try{
      const newFunctionality = await PositionMenuFunctionality.create({ role_id, module_menu_id, functionality, additional });
      res.status(201).json({ 
        message: "positions_menus_functionalities has been created successfully",         
        newFunctionality 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { role_id, module_menu_id, functionality, additional } = req.body;

    const fields = {};
    if (role_id) fields.role_id = role_id;
    if (module_menu_id) fields.module_menu_id = module_menu_id;
    if (functionality) fields.functionality = functionality;
    if (additional !== undefined) fields.additional = additional;
    try {
      const updateFunctionality = await PositionMenuFunctionality.update(id, fields);

      if (!updateFunctionality) {
        return res.status(404).json({ message: "Position Menu Functionality not found" });
      }
      res.status(200).json({
        message: "Position Menu Functionality has been updated successfully",
        updateFunctionality
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }


  static async delete(req, res){
    const { role_id, module_menu_id } = req.params;
    try{
      const deletedFunctionality = await PositionMenuFunctionality.delete(role_id, module_menu_id);
      if(!deletedFunctionality){
        return res.status(404).json({ message: "Role Menu Functionality not found"});
      }
      res.status(200).json({ 
        message: "positions_menus_functionalities has been deleted successfully",               
        deletedFunctionality 
      });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

}

module.exports = PositionMenuFunctionalityController;