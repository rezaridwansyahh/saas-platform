const { getUserByEmail } = require('../models/usersModel.js');
const { getEmployeeById } = require('../models/employeesModel.js');
const { getCompanyById, getCompanyByTenant } = require('../models/companiesModel.js');
const { addUser } = require('../models/usersModel.js');
const { addEmployee } = require('../models/employeesModel.js');
const { getPositionById } = require('../models/positionsModel.js');

const logger = require('../middlewares/logger.js');

const path = require("path");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// 1. Load environment file based on NODE_ENV
const ENV = process.env.NODE_ENV || "development";
dotenv.config({ path: path.resolve(__dirname, `../.env.${ENV}`) });

const JWT_SECRET = process.env.JWT_SECRET;

exports.loginUser = async (req, res) => {
  const tenant = req.tenant;
  const { email, password } = req.body;

  try {
    logger.error(`Login attempt for email: ${req.body.email}`);
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'No User Found' }); // Check if user exists
    }

    const employee = await getEmployeeById(user.employee_id);
    const company = await getCompanyById(employee.company_id);

    if (company.tenant_name !== tenant) {
      return res.status(401).json({ message: 'Invalid Tenant' }); // Ensure the user belongs to the correct tenant
    }

    if (password !== user.user_password) {
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
      userId: user.user_id, 
      userEmail: user.email, 
      employeeId: user.employee_id,
      positionId: employee.position_id,
      tenant: company.tenant_name,
      companyId: company.company_id
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    logger.info('Login successful');
    return res.status(200).json({
      message: 'Login successful',
      token,
      company: {
        id: company.company_id,
        name: company.name,
        logo: company.logo
      },
      user: {
        id: user.user_id,
        email: user.email,
        employeeId: user.employee_id
      }
    });
  } catch (err) {
    logger.error(`Login failed: ${err.message}`);
    return res.status(500).json({ message: err.message });
  }
}

exports.registerUser = async(req, res) => {
  const tenant = req.tenant;
  const { email, password, employee_name, position_id, company_id } = req.body;

  if (!email || !password || !employee_name || !position_id) {
    return res.status(400).json({ message: 'Email, password, and employee name are required' });
  }

  const company = await getCompanyById(company_id);

  if (!company || company.tenant_name !== tenant) {
    return res.status(400).json({ message: 'Invalid company or tenant' });
  }

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = await addEmployee(employee_name, 'path/to/your/profile', company_id, position_id);
    const newUser = await addUser(employee.employee_id, email, hashedPassword, employee.position_id);
    
    if (!newUser) {
      return res.status(500).json({ message: 'Failed to create user' });
    }

    return res.status(200).json({ message: 'User registered successfully', newUser});
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}