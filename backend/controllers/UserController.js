const User = require('../models/UserModel.js');

class UserController {
  static async getAll(req, res) {
    try {
      const users = await User.getAll();

      res.status(200).json({ 
        message: "List of all Users",
        users 
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const user = await User.getById(id);

      if(!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ 
        message: 'List User by Id',
        user
      });
    } catch(error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getByEmployeeId(req, res) {
    const { employee_id } = req.params;

    try {
      const user = await User.getByEmployeeId(employee_id);

      if(!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ 
        message: 'List User by Employee Id',
        user
      });
    } catch(error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getByPositionId(req, res) {
    const { position_id } = req.params;

    try {
      const position = await Position.getById(position_id);

      if(!position) {
        return res.status(404).json({ message: 'Position not found' });
      }

      const users = await User.getByPositionId(position_id);

      res.status(200).json({ 
        message: 'List of Users by Position Id',
        position,
        users
      });
    } catch(error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async create(req, res) {
    const { employee_id, email, password } = req.body;
    try {
      const user = await User.create({ employee_id, email, password });

      res.status(201).json({
        message: 'User created',
        user
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;

      const user = await User.getById(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await User.delete(id);

      res.status(200).json({ 
        message: 'User deleted successfully',
        user
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { email, password } = req.body;
    const fields = {};

    if (email) fields.email = email;
    if (password) fields.password = password;

    try {
      const user = await User.getById(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const updatedUser = await User.update(id, fields);

      res.status(200).json({
        message: 'User updated successfully',
        user: updatedUser
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserController;