const path = require("path");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');

const User = require('../models/UserModel.js');
const Employee = require('../models/EmployeeModel.js');
const Company = require('../models/CompanyModel.js');
const Position = require('../models/PositionModel.js');

const logger = require('../utils/logger.js');

const ENV = process.env.NODE_ENV || "development";
dotenv.config({ path: path.resolve(__dirname, `../.env.${ENV}`) });

const JWT_SECRET = process.env.JWT_SECRET;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;


class AuthController {
  static async login(req, res) {
    const tenant = req.tenant;
    const { email, password, captcha } = req.body;

    try {

      // if(!captcha){
      //   return res.status(400).json({ message: 'Captcha is required' });
      // }

      // const captchaVerificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${captcha}`;
      // const { data } = await axios.post(captchaVerificationUrl);
      // console.log(data);
      

      // if(!data.success){
      //   return res.status(400).json({ message: 'Captcha verification failed' });
      // }

      logger.error(`Login attempt for email: ${req.body.email}`);
      const user = await User.getByEmail(email);

      if (!user) {
        return res.status(401).json({ message: 'No User Found' }); // Check if user exists
      }

      const employee = await Employee.getById(user.employee_id);
      const company = await Company.getById(employee.company_id);

      if (company.tenant_name !== tenant) {
        return res.status(401).json({ message: 'Invalid Tenant' }); // Ensure the user belongs to the correct tenant
      }

      if (password !== user.password) {
          return res.status(401).json({ message: 'Invalid Email or Password' 
        });
      }

      // bcrypt.compare(password, user.user_password, async (err, isMatch) => {
      //   if (err) {
      //     return res.status(500).json({ message: 'Error comparing passwords' });
      //   }
      //   if (!isMatch) {
      //     return res.status(401).json({ message: 'Invalid Email or Password' });
      //   }
      // });

      const payload = { 
        user_id: user.id, 
        email: user.email, 
        employee_id: user.employee_id,
        role_id: employee.role_id,
        tenant_name: company.tenant_name,
        company_id: company.id
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
      logger.info('Login successful');
      return res.status(200).json({
        message: 'Login successful',
        token,
        company: {
          id: company.id,
          name: company.name,
          logo: company.logo
        },
        user: {
          id: user.id,
          email: user.email,
          employee_id: user.employee_id
        }
      });
    } catch (err) {
      logger.error(`Login failed: ${err.message}`);
      return res.status(500).json({ message: err.message });
    }
  }

  static async register(req, res) {
    const tenant = req.tenant;
    const { email, password, employee_name, role_id, company_id } = req.body;

    if (!email || !password || !employee_name || !role_id) {
      return res.status(400).json({ message: 'Email, password, and employee name are required' });
    }

    const company = await Company.getById(company_id);

    if (!company || company.tenant_name !== tenant) {
      return res.status(400).json({ message: 'Invalid company or tenant' });
    }

    try {
      const existingUser = await Users.getUserByEmail(email);

      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const profile_picture = "path/to/your/profile";
      const hashedPassword = await bcrypt.hash(password, 10);
      const newEmployee = await Employee.create(employee_name, profile_picture, company_id, role_id);
      const newUser = await Users.addUser(newEmployee.id, email, hashedPassword);

      if (!newUser) {
        return res.status(500).json({ message: 'Failed to create user' });
      }

      return res.status(200).json({ message: 'User registered successfully', newUser});
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = AuthController;