const Position = require('../models/PositionModel.js');
const Company = require('../models/CompanyModel.js');
const Department = require('../models/DepartmentModel.js');
const User = require('../models/UserModel.js');
const ModuleMenuFunctionality = require('../models/PositionMenuFunctionalityModel.js');

class PositionController {
  static async getAll(req, res) {
    try {
      const positions = await Position.getAll();

      res.status(200).json({ 
        message: "List all Positions",
        positions 
      });
    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const position = await Position.getById(id);

      if (!position) {
        return res.status(404).json({ message: "Position not found" });
      }

      res.status(200).json({ 
        message: "List Employee by Id",
        position 
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getByDepartmentId(req, res) {
    const { department_id } = req.params;

    try {
      const department = await Department.getById(department_id);

      if(!department) {
        return res.status(404).json({ message: "Department not found" });
      }

      const positions = await Position.getByDepartmentId(department_id);

      res.status(200).json({
        message: "List of Positions inside this Department",
        department,
        positions
      });
    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getByModuleMenuFunctionalityId(req, res) {
    const { module_menu_functionality_id } = req.params;

    try {
      const moduleMenuFunctionality = await ModuleMenuFunctionality.getById(module_menu_functionality_id);

      if(!moduleMenuFunctionality) {
        return res.status(404).json({ message: "Module Menu not found" });
      }

      const positions = await Position.getByModuleMenuFunctionalityId(module_menu_functionality_id);

      res.status(200).json({ 
        message: "List of Positions this Module Menu Functionality",
        moduleMenuFunctionality,
        positions 
      });
    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getByUserId(req, res) {
    const { user_id } = req.params;

    try {
      const user = await User.getById(user_id);

      if(!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const positions = await Position.getByUserId(user_id);

      res.status(200).json({ 
        message: "List of Positions this User have",
        user,
        positions 
      });
    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async create(req, res) {
    const { name } = req.body;

    try {
      const newPosition = await Position.create(name);
      res.status(201).json({ newPosition });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const fields = {};

    if (name) fields.name = name;

    try {
      const position = await Position.getById(id);

      if (!position) {
        return res.status(404).json({ message: "Position not found" });
      }

      const updatedPosition = await Position.update(id, fields);

      res.status(200).json({ updatedPosition });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    const companyId = req.user.companyId;
    const { id } = req.params;

    try {
      const position = await Position.delete(id);

      if (!position) {
        return res.status(404).json({ message: "Position not found" });
      }

      if (position.company_id !== companyId) {
        return res.status(403).json({ message: "You do not have permission to delete this position" });
      }
      
      await Positions.deletePosition(id);
      res.status(200).json({ message: "Position deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = PositionController;