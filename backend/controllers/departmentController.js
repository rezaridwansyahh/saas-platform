const Departments = require('../models/departmentsModel.js');
const Roles = require('../models/rolesModel.js');

class DepartmentController {
  static async fetchAllDepartments(req, res) {
    try {
      const departments = await Departments.getAllDepartments();

      res.status(200).json({ departments });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async fetchDepartmentById(req, res) {
    try {
      const id = req.params.id;

      const department = await Departments.getDepartmentById(id);

      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }

      res.status(200).json({ department });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async fetchDepartmentByCompanyId(req, res) {
    try {
      const companyId = req.params.companyId;

      const department = await Departments.getDepartmentByCompanyId(req.params.companyId);

      if(!department) {
        return res.status(404).json({ message: "Department not found" });
      }

      res.status(200).json({
        message: 'Department fetched successfully',
        department
      });
    } catch(error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      });
    }
  }

  static async createDepartment(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Department name is required" });
      }

      const newDepartment = await Departments.addDepartment(name);

      res.status(201).json({ 
        message: "Department created successfully", 
        department: newDepartment 
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Internal Server Error', 
        error: error.message 
      });
    }
  }

  static async deleteDepartment(req, res) {
    try {
      const id = req.params.id;
      const companyId = req.params.companyId;

      const deleted = await Departments.deleteDepartmentByIdAndCompanyId(id, companyId);

      if (!deleted) {
        return res.status(404).json({ message: "Department not found / Company not valid" });
      }

      res.status(200).json({ 
        message: "Department deleted successfully",
        department: deleted 
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      });
    }
  }

  static async updateDepartment(req, res) {
    try {
      const id = req.params.id;
      const companyId = req.params.companyId;
      const name = req.body.name

      const updated = await Departments.updateDepartmentByIdAndCompanyId(id, companyId, name);

      if(!updated) {
        return res.status(404).json({ message: "Department not found / Company not valid" });
      }

      res.status(200).json({
        message: "Department updated successfully",
        department: updated
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      });
    }
  }
}

module.exports = DepartmentController;