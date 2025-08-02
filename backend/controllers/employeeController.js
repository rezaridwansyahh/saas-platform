const { getEmployeeById, getEmployeeByCompanyId, addEmployee, deleteEmployee, editEmployee } = require('../models/employeesModel.js');
const { getPositionById } = require('../models/positionsModel.js');

exports.fetchEmployeeId = async(req, res) => {
  const companyId = req.user.companyId;
  const { id } = req.params;

  try{
    const employee = await getEmployeeById(id);

    if(!employee){
      res.status(404).json({message: "The employee id not found"})
    }

    if(employee.company_id !== companyId){
      return res.status(403).json({message: "You do not have permission to access this employee"});
    }

    res.status(200).json({ employee });
  } catch(err){
    res.status(500).json({message: err.message});
  }
}

exports.fetchEmployeeByCompanyId = async(req, res) => {
  try {
    const employeeByCompanyId = await getEmployeeByCompanyId(companyId);

    if(!employeeByCompanyId){
      return res.status(404).json({message: "No employees found for this company"});
    }

    res.status(200).json({employeeByCompanyId});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

exports.createEmployee = async(req, res) => {
  const companyId = req.user.companyId;
  const { name, profile_picture, company_id, position_id } = req.body;
  const position = await getPositionById(position_id);

  try {
    if (!position || position.company_id !== companyId) {
      return res.status(403).json({ message: "Invalid position for this company" });
    }

    if (company_id !== companyId) {
      return res.status(403).json({ message: "You do not have permission to add employees to this company" });
    }

    const newEmployee = await addEmployee(name, profile_picture, company_id, position_id);

    res.status(201).json({
      message: "employee Created",
      employee: newEmployee
    })
  } catch(err){
    res.status(500).json({message: err.message})
  }
}

exports.removeEmployee = async(req, res) => {
  const companyId = req.user.companyId;
  const { id } = req.params;

  try{
    const employee = await getEmployeeById(id);

    if(!employee) {
      return res.status(404).json({message: "Employee not found"});
    }

    if(employee.company_id !== companyId) {
      return res.status(403).json({message: "You do not have permission to delete this employee"});
    }
    
    await deleteEmployee(id);

    res.status(200).json({
      message: "Employee deleted",
      empoyee: {
        id: employee.employee_id,
        name: employee.name
      }
    })
  } catch(err){
    res.status(500).json({message: err.message})
  }
}

exports.updateEmployee = async (req, res) => {
  const companyId = req.user.companyId;
  const { id } = req.params;
  const { name, profile_picture } = req.body;

  try {
    const employee = await getEmployeeById(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (employee.company_id !== companyId) {
      return res.status(403).json({ message: "You do not have permission to update this employee" });
    }

    await editEmployee(name, profile_picture, id);

    res.status(200).json({
      message: "Employee updated",
      employee: {
        id: employee.employee_id,
        name: employee.name,
        profile_picture: employee.profile_picture
      }
    })
  } catch(err){
    res.status(500).json({message: err.message})
  }
}


