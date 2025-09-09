module.exports = [
  // PT Abhimata Persada (company_id: 1) has Employee Management, Payroll, Time Tracking
  { id: 1, module_id: 1, company_id: 1 }, // Employee Management -> PT Abhimata Persada
  { id: 2, module_id: 2, company_id: 1 }, // Payroll -> PT Abhimata Persada
  { id: 3, module_id: 3, company_id: 1 }, // Time Tracking -> PT Abhimata Persada
  
  // PT Anytime Fitness (company_id: 2) has Employee Management, Payroll
  { id: 4, module_id: 4, company_id: 2 }, // Employee Management -> PT Anytime Fitness
  { id: 5, module_id: 5, company_id: 2 }, // Payroll -> PT Anytime Fitness
  
  // PT Optima Solusi Pembayaran (company_id: 3) has Employee Management, Finance
  { id: 6, module_id: 6, company_id: 3 }, // Employee Management -> PT Optima Solusi Pembayaran
  { id: 7, module_id: 7, company_id: 3 }  // Finance -> PT Optima Solusi Pembayaran
];