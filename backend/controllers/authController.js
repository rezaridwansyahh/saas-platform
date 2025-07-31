const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretKey = process.env.JWT_SECRET;

const { getUserByEmail } = require('../models/usersModel.js');
const { getEmployeeById } = require('../models/employeesModel.js');
const { getCompanyById } = require('../models/companiesModel.js');
const jwt = require('jsonwebtoken');
const path = require("path");
const dotenv = require("dotenv");

// 1. Load environment file based on NODE_ENV
const ENV = process.env.NODE_ENV || "development";
dotenv.config({ path: path.resolve(__dirname, `../.env.${ENV}`) });

const JWT_SECRET = process.env.JWT_SECRET;

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid Email or Password' });
    }
    if (password !== user.user_password) {
      return res.status(401).json({ message: 'Invalid Email or Password' });
    }

    const employee = await getEmployeeById(user.employee_id);
    const company = await getCompanyById(employee.company_id);

    const token = jwt.sign({ userId: user.user_id, userEmail: user.email }, JWT_SECRET, {
      expiresIn: '1m',
    });

    return res.status(200).json({ message: 'login successful', company: company.name, token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}