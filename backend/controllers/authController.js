const { getUserByEmail } = require('../models/usersModel.js');
const { getEmployeeById } = require('../models/employeesModel.js');
const { getCompanyById } = require('../models/companiesModel.js')

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

    return res.status(200).json({ message: 'login successful', company: company.name });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}