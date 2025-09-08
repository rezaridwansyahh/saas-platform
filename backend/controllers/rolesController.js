const Roles = require('../models/rolesModel.js');
const Departments = require('../models/departmentsModel.js');
const Users = require('../models/usersModel.js');

class RolesController {
	static async fetchAllRoles(req, res) {
		try {
			const roles = await Roles.getAllRoles();
			res.status(200).json(roles);
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}

	static async fetchRoleById(req, res) {
		try {
			const role = await Roles.getRoleById(req.params.id);

			if (!role) {
				return res.status(404).json({ error: 'Role not found' });
			}
			
			res.status(200).json(role);
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}

	static async createRole(req, res) {
		try {
			const name = req.body.name;

			if (!name) {
				return res.status(400).json({ error: 'Role name is required' });
			}

			const newRole = await Roles.addRole(name);
			res.status(201).json(newRole);
		} catch (error) {
			res.status(500).json({ 
				message: 'Internal Server Error',
				error: error.message
			});
		}
	}

	static async deleteRole(req, res) {
		try {
			const roleId = req.params.id;

			const checkRoleId = await Roles.getRoleById(roleId);

			if (!checkRoleId) {
				return res.status(404).json({ error: 'Role not found' });
			}

			await Roles.removeRole(roleId);
			
			res.status(204).json({ 
				message: 'Role deleted',
				role: {
					id: checkRoleId.id,
					name: checkRoleId.name
				}
			});
		} catch (error) {
			res.status(500).json({ 
				message: 'Internal Server Error',
				error: error.message
			});
		}
	}

	static async updateRole(req, res) {
		try {
			const roleId = req.params.id;

			const checkRoleId = await Roles.getRoleById(roleId);

			if (!checkRoleId) {
				return res.status(404).json({ error: 'Role not found' });
			}

			const updatedName = req.body.name;

			if (!updatedName) {
				return res.status(400).json({ error: 'Role name is required' });
			}

			const updatedRole = await Roles.updateRole(roleId, updatedName);

			res.status(200).json({ 
				message: 'Role updated successfully',
				role: updatedRole
			});
		} catch(error) {
			res.status(500).json({ 
				message: 'Internal Server Error', 
				error: error.message 
			})
		}
	} 
}

module.exports = RolesController;