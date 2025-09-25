const DepartmentPosition = require('../models/DepartmentPositionModel.js');
const Department = require('../models/DepartmentModel.js');
const Position = require('../models/PositionModel.js');

class DepartmentPositionController {
  static async getAll(req, res) {
    try {
      const departmentsPositions = await DepartmentPosition.getAll();

      res.status(200).json({
        message: "List all Departments-Positions",
        departmentsPositions 
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getAllWithDetails(req, res) {
    try {
      const departmentsPositions = await DepartmentPosition.getAllWithDetails();

      res.status(200).json({ 
        message: "List all Departments-Positions with details",
        departmentsPositions 
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const departmentPosition = await DepartmentPosition.getById(id);
      
      res.status(200).json({ 
        message: "List Department-Position by Id",
        departmentPosition 
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

      const departmentPositions = await DepartmentPosition.getByDepartmentId(department_id);

      res.status(200).json({
        message: "List of Department-Positions by Department",
        department,
        departmentPositions
       });

    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getByPositionId(req, res) {
    const { position_id } = req.params;

    try {
      const position = await Position.getById(position_id);

      if(!position) {
        return res.status(404).json({ message: "Position not found"});
      }

      const departmentsPosition = await DepartmentPosition.getByPositionId(position_id);

      res.status(200).json({ 
        message: "List of Departments-Position by Position",
        position,
        departmentsPosition
      });
    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getByDepartmentAndPosition(req, res) {
    const { department_id, position_id } = req.params;

    try {
      const department = await Department.getById(department_id);

      if(!department) {
        return res.status(404).json({ message: "Department not found" });
      }

      const position = await Position.getById(position_id);

      if(!position) {
        return res.status(404).json({ message: "Position not found" });
      }

      const departmentPosition = await DepartmentPosition.getByDepartmentAndPosition(department_id, position_id);

      if(!departmentPosition) {
        return res.status(404).json({ message: "DepartmentPosition not found" });
      }

      res.status(200).json({ 
        message: "List of Department-Position by Department and Position",
        department,
        position,
        departmentPosition
      });
    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async create(req, res) {
    const { department_id, position_id } = req.body;

    try {
      const departmentPosition = await DepartmentPosition.create(department_id, position_id);

      res.status(201).json({
        message: 'Position assigned to department',
        departmentPosition
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    const { department_id, position_id } = req.body;
    
    try {
      const departmentPosition = await DepartmentPosition.delete(department_id, position_id);
      res.status(200).json({ 
        message: 'Position removed from department',
        departmentPosition
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = DepartmentPositionController;