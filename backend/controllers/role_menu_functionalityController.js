const RoleMenuFunctionality = require('../models/role_menu_functionalityModel.js');

class RoleMenuFunctionalityController {
  static async getAllRoleMenuFunctionality(req, res){
    try{
      const functionality = await RoleMenuFunctionality.getAllRoleMenuFunctionality();
      res.status(200).json({ functionality });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getRoleMenuFunctionalityById(req, res){
    const { role_id, module_menu_id } = req.params;
    try {
      const functionality = await RoleMenuFunctionality.getRoleMenuFunctionalityById(role_id, module_menu_id);
      if(!functionality){
        return res.status(404).json({ message: "Role Menu Functionality not found" });
      }
      res.status(200).json({ functionality });
    }catch(err){
      res.status(500).json({ message: err.message});
    }
  }

  static async createRoleMenuFunctionality(req, res){
    const { role_id, module_menu_id, functionality, additional } = req.body;
    if(!role_id || !module_menu_id || !functionality){
      return res.status(400).json({ message: "role_id, module_menu_id and functionality are required" });
    }
    try{
      const newFunctionality = await RoleMenuFunctionality.createRoleMenuFunctionality({ role_id, module_menu_id, functionality, additional });
      res.status(201).json({ newFunctionality });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteRoleMenuFunctionality(req, res){
    const { role_id, module_menu_id } = req.params;
    try{
      const deletedFunctionality = await RoleMenuFunctionality.deleteRoleMenuFunctionality(role_id, module_menu_id);
      if(!deletedFunctionality){
        return res.status(404).json({ message: "Role Menu Functionality not found"});
      }
      res.status(200).json({ deletedFunctionality });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getRoleMenuFunctionalityByRoleId(req, res){
    const { role_id } = req.params;
    try{
      const functionality = await RoleMenuFunctionality.getFunctionalityByRoleId(role_id);
      res.status(200).json({ functionality });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getRoleMenuFunctionalityByModuleMenuId(req, res){
    const { module_menu_id } = req.params;
    try{
      const functionality = await RoleMenuFunctionality.getRoleMenuFunctionalityByModuleMenuId(module_menu_id);
      res.status(200).json({ functionality });
    }catch(err){
      res.status(500).json({ message: err.message });
    }    
  }

}

module.exports = RoleMenuFunctionalityController;