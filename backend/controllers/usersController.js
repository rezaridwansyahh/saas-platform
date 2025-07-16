const { addUser, getAllUsers } = require('../models/usersModel.js');

exports.fetchUsers = async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    res.status(200).json({ allEmployees });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.createUser = async (req, res) => {
  const { employee_id, user_id, email, password } = req.body;
  try {
    const newUser = await addUser(employee_id, user_id, email, password);

    res.status(201).json({
      message: 'User created',
      user: newUser
    }); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}