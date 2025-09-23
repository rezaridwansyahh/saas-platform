const UserPosition = require('../models/UserPositionModel.js');
const User = require('../models/UserModel.js');
const Position = require('../models/PositionModel.js');

class UserPositionController {
  static async getAll(req, res) {
    try {
      const usersPositions = await UserPosition.getAll();
      res.status(200).json({ 
        message: "List all Users Positions",
        usersPositions
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getAllDetails(req, res) {
    try {
      const usersPositions = await UserPosition.getAllDetails();

      res.status(200).json({ 
        message: "List all Users Positions with Details",
        usersPositions
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const userPosition = await UserPosition.getById(id);

      if (!userPosition) {
        return res.status(404).json({ message: 'User Position not found' });
      }
      res.status(200).json({ 
        message: "List User Position by Id",
        userPosition
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getByUserId(req, res) {
    const { user_id } = req.params;

    try {
      const user = await User.getById(user_id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const roles = await UserPosition.getByUserId(user_id);

      res.status(200).json({
        message: "List of Positions assigned to this User",
        user,
        roles
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getByPositionId(req, res) {
    const { position_id } = req.params;
    
    try {
      const position = await Position.getById(position_id);

      if (!position) {
        return res.status(404).json({ message: 'Position not found' });
      }

      const users = await UserPosition.getByPositionId(position_id);

      res.status(200).json({
        message: "List of Users assigned to this Position",
        position,
        users
       });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getByUserAndPosition(req, res) {
    const { user_id, position_id } = req.params;

    try {
      const user = await User.getById(user_id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const position = await Position.getById(position_id);

      if (!position) {
        return res.status(404).json({ message: 'Position not found' });
      }

      const userPosition = await UserPosition.getByUserAndPosition(user_id, position_id);

      res.status(200).json({
        message: "List User Position by User and Position",
        user,
        position,
        userPosition
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async create(req, res) {
    const { user_id, role_id } = req.body;

    try {
      const userPosition = await UserPosition.create(user_id, role_id);
      
      res.status(201).json({ 
        message: 'Position assigned to user', 
        userPosition
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    const { user_id, role_id } = req.body;

    try {
      const userPosition = await UserPosition.delete(user_id, role_id);

      res.status(200).json({ 
        message: 'Position removed from user', 
        userPosition 
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserPositionController;