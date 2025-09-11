module.exports = [
  // PT Abhimata Persada modules to departments
  { id: 1, module_id: 1, department_id: 1 }, // Employee Management -> IT Development
  { id: 2, module_id: 1, department_id: 3 }, // Employee Management -> Administration
  { id: 3, module_id: 2, department_id: 3 }, // Payroll -> Administration
  { id: 4, module_id: 3, department_id: 1 }, // Time Tracking -> IT Development
  { id: 5, module_id: 3, department_id: 2 }, // Time Tracking -> Medical
  
  // PT Anytime Fitness modules to departments
  { id: 6, module_id: 4, department_id: 4 }, // Employee Management -> Development
  { id: 7, module_id: 4, department_id: 5 } // Employee Management -> Operations
];