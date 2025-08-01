const { getAllEmployees,getEmployeeById, getEmployeeByCompanyId, addEmployee, deleteEmployee, editEmployee } = require('../models/employeesModel.js')

exports.fetchEmployee = async(req, res)=> {
  try{
    const allEmployees = await getAllEmployees();
    res.status(200).json({allEmployees});
  }catch(err){
    res.status(500).json({ message: err.message});
  }
}

exports.fetchEmployeeId = async(req, res) => {
  const { id } = req.params;
  try{
    const employeeId = await getEmployeeById(id);

    if(!employeeId){
      res.status(404).json({message: "The employee id not found"})
    }else{
      res.status(200).json({employeeId});
    }
  }catch(err){
    res.status(500).json({message: err.message});
  }
}

exports.fetchEmployeeByCompanyId = async(req, res) => {
  const { companyId } = req.params;
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
  const { name, profile_picture, company_id, position_id} = req.body;

  try{
    const newEmployee = await addEmployee(name, profile_picture, company_id, position_id);

    res.status(201).json({
      message: "employee Created",
      employee: newEmployee
    })
  }catch(err){
    res.status(500).json({message: err.message})
  }
}

exports.removeEmployee = async(req, res) => {
  const { id } = req.params;

  try{
    const deleted = await deleteEmployee(id);
    if(!deleted){
      res.status(404).json({message: "Employee not found"})
    }
    res.status(200).json({
      message: "Employee deleted",
      employee: deleted
    })
  }catch(err){
    res.status(500).json({message: err.message})
  }
}

exports.updateEmploye = async (req, res) => {
  const { id } = req.params;
  const {name, profile_picture} = req.body;

  try{
    const updated = await editEmployee(id, name, profile_picture);
    if(!updated){
      res.status(404).json({message: "Employee not found"})
    }

    res.status(200).json({
      message: "Employe updated",
      employee: updated
    })
  }catch(err){
    res.status(500).json({message: err.message})
  }
}


