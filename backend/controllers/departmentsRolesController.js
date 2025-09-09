const DepartmentRoles = require('../models/departmentsRolesModel.js');

class DepartmentRolesController {
  static async fetchDepartmentsByRoleId(req, res) {
    const { roleId } = req.params;
    try {
      const departments = await DepartmentRoles.getDepartmentByRoleId(roleId);
      res.status(200).json({ 
        message: 'Departments fetched successfully',
        departments
       });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async fetchRolesByDepartmentId(req, res) {
    const { departmentId } = req.params;
    try {
      const roles = await DepartmentRoles.getRolesByDepartmentId(departmentId);
      res.status(200).json({ 
        message: 'Roles fetched successfully',
        roles 
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async assignRoleToDepartment(req, res) {
    const { departmentId, roleId } = req.body;
    try {
      const assigned = await DepartmentRoles.assignRoleToDepartment(departmentId, roleId);
      res.status(201).json({ 
        message: 'Role assigned to department successfully',
        assigned 
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async removeRoleFromDepartment(req, res) {
    const { departmentId, roleId } = req.body;
    try {
      const removed = await DepartmentRoles.removeRoleFromDepartment(departmentId, roleId);
      res.status(200).json({ 
        message: 'Role removed from department successfully',
        removed 
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = DepartmentRolesController;