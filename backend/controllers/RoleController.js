const Roles = require('../models/PositionModel.js');
const Company = require('../models/CompanyModel.js');

class RoleController {
	static async getAll(req, res) {
		try {
			const roles = await Roles.getAll();

			res.status(200).json({ 
				message: "List all Roles",
				roles 
			});
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	}

	static async getById(req, res) {
		const { id } = req.params;

		try {
			const role = await Roles.getById(id);

			if (!role) {
				return res.status(404).json({ message: 'Role not found' });
			}
			
			res.status(200).json({
				message: "List Role By Id",
				role
			});
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	}

	static async getByCompanyId(req, res) {
		const { company_id } = req.params;

		try {
			const company = await Company.getById(company_id);

			if (!company) {
				return res.status(404).json({ message: 'Department not found' });
			}

			const roles = await Roles.getByCompanyId(company_id);

			res.status(200).json({
				message: "List of Roles inside this Company",
				company,
				roles
			});
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	}

	static async create(req, res) {
		const {companyId} = req.user;
		const {name} = req.body;
		try {

			if (!name) {
				return res.status(400).json({ message: 'Role name is required' });
			}

			const company = await Company.getById(companyId);

			if (!company) {
				return res.status(404).json({ error: 'Company not found' });
			}

			// Check for duplicate role name within the same company
			const existingRoles = await Roles.getByCompanyId(companyId);
			const duplicateRole = existingRoles.find(role => role.name.toLowerCase() === name.toLowerCase());

			if (duplicateRole) {
				return res.status(409).json({ error: 'Role name already exists in this company' });
			}

			// Proceed to create the new role
			const newRole = await Roles.create({ name, company_id: companyId });

			res.status(201).json(newRole);
		} catch (err) {
			res.status(500).json({ message: err.message});
		}
	}

	static async delete(req, res) {
		const { id } = req.params;

		try {

			const role = await Roles.getById(id);

			if (!role) {
				return res.status(404).json({ message: 'Role not found' });
			}

			await Roles.delete(id);

			res.status(204).json({ 
				message: 'Role deleted',
				role
			});
		} catch (err) {
			res.status(500).json({ message: err.message })
		}
	}

	static async update(req, res) {
		const { id } = req.params;
		const { companyId } = req.user;
		const { name, additional } = req.body;

		const fields = {};

		fields.company_id = companyId;
		if (name) fields.name = name;
		if (additional) fields.additional = additional;

		try {
			const role = await Roles.getById(id);

			if (!role) {
				return res.status(404).json({ message: 'Role not found' });
			}

			const updatedRole = await Roles.updateRole(id, fields);

			res.status(200).json({ 
				message: 'Role updated',
				updatedRole
			});
		} catch(err) {
			res.status(500).json({ message: err.message });
		}
	} 
}

module.exports = RoleController;