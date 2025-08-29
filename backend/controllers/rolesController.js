const Roles = require('../models/rolesModel.js');

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

	static async fetchDepartmentsByRoleId(req, res) {
		try {
			const departments = await Roles.getDepartmentByRoleId(req.params.id);

			if (!departments) {
				return res.status(404).json({ error: 'No departments found for this role' });
			}

			res.status(200).json(departments);
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}
}

module.exports = RolesController;