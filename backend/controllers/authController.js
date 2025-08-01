const { getUserByEmail } = require('../models/usersModel.js');
const { getEmployeeById } = require('../models/employeesModel.js');
const { getCompanyById } = require('../models/companiesModel.js');
const { addUser } = require('../models/usersModel.js');
const { addEmployee } = require('../models/employeesModel.js');
const { getPositionById } = require('../models/positionsModel.js');

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

exports.registerUser = async(req, res) => {
  const {email, password, employee_name, position_id, company_id} = req.body;
  console.log("bisa");
  

  if (!email || !password || !employee_name || !position_id) {
    return res.status(400).json({ message: 'Email, password, and employee name are required' });
  }
  console.log("bisa2");
  try{
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("bisa3");
    const employee = await addEmployee(employee_name, 'path/to/your/profile', company_id, position_id);
    console.log("New employee:", employee);
    console.log("New employee_id:", employee?.employee_id);
    console.log("bisa4");
    const newUser = await addUser(employee.employee_id, email, hashedPassword, employee.position_id);
    console.log("New user:", newUser);
    
    console.log("bisa5");
    
    if (!newUser) {
      return res.status(500).json({ message: 'Failed to create user' });
    }
    return res.status(200).json({ message: 'User registered successfully'});
  }catch(err) {
    return res.status(500).json({ message: err.message });
  }

}