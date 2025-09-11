const Users = require('../models/usersModel.js');

class UsersController {
  static async fetchAllUsers(req, res) {
    try {
      const allUsers = await Users.getAllUsers();
      res.status(200).json({ allUsers });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async fetchUserById(req, res) {
    try {
      const id = req.params.id;

      const user = await Users.getUserById(id);

      if(!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ 
        message: 'User fetched successfully',
        user
      });
    } catch(error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createUser(req, res) {
    const { employee_id, user_id, email, password } = req.body;
    try {
      const newUser = await Users.addUser(employee_id, email, password);

      res.status(201).json({
        message: 'User created',
        user: newUser
      }); 
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const id = req.params.id;

      const checkId = await Users.getUserById(id);

      if (!checkId) {
        return res.status(404).json({ message: 'User not found' });
      }

      await Users.deleteUser(id);

      res.status(200).json({ 
        message: 'User deleted successfully',
        user: {
          id: checkId.id,
          email: checkId.email
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateUser(req, res) {
    const id = req.params.id;
    const {email, password} = req.body;
    const fields = {};

    if(email) fields.email = email;
    if(password) fields.password = password;


    try {
      const user = await Users.getUserById(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const updatedUser = await Users.updateUser(id, fields);

      res.status(200).json({
        message: 'User updated successfully',
        user: updatedUser
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UsersController;