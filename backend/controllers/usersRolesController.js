const usersRoles = require('../models/usersRolesModel.js');

class UsersRolesController {
  static async fetchRolesByUserId(req, res) {
    const { userId } = req.params;
    try {
      const roles = await usersRoles.getRolesByUserId(userId);
      res.status(200).json({ roles });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async fetchUsersByRoleId(req, res) {
    const { roleId } = req.params;
    try {
      const users = await usersRoles.getUsersByRoleId(roleId);
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async assignRoleToUser(req, res) {
    const { userId, roleId } = req.body;
    try {
      const assignment = await userRole.assignRoleToUser(userId, roleId);
      res.status(201).json({ message: 'Role assigned to user', assignment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async removeRoleFromUser(req, res) {
    const { userId, roleId } = req.body;
    try {
      const removal = await userRole.removeRoleFromUser(userId, roleId);
      res.status(200).json({ message: 'Role removed from user', removal });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UsersRolesController;