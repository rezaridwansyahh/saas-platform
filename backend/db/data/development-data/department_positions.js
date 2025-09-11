module.exports = [
  // Senior Developer can work in multiple IT departments
  { id: 1, department_id: 1, position_id: 1 }, // IT Development
  { id: 2, department_id: 4, position_id: 1 }, // Development (Company 2)
  { id: 3, department_id: 6, position_id: 1 }, // Engineering (Company 3)

  // Junior Developer in IT departments
  { id: 4, department_id: 1, position_id: 2 }, // IT Development
  { id: 5, department_id: 4, position_id: 2 }, // Development (Company 2)
  { id: 6, department_id: 6, position_id: 2 }, // Engineering (Company 3)

  // Medical roles only in Medical department
  { id: 7, department_id: 2, position_id: 3 }, // Lead Doctor
  { id: 8, department_id: 2, position_id: 4 }, // Dentist

  // Admin Staff can work in multiple departments
  { id: 9, department_id: 3, position_id: 5 }, // Administration
  { id: 10, department_id: 5, position_id: 5 }, // Operations (Company 2)
  { id: 11, department_id: 7, position_id: 5 }, // Finance (Company 3)

  // Full Stack Developer in development departments
  { id: 12, department_id: 1, position_id: 6 }, // IT Development
  { id: 13, department_id: 4, position_id: 6 }, // Development (Company 2)
  { id: 14, department_id: 6, position_id: 6 }, // Engineering (Company 3)

  // DevOps Engineer in technical departments
  { id: 15, department_id: 1, position_id: 7 }, // IT Development
  { id: 16, department_id: 4, position_id: 7 }, // Development (Company 2)
  { id: 17, department_id: 5, position_id: 7 }, // Operations (Company 2)

  // Software Engineer in engineering/development departments
  { id: 18, department_id: 1, position_id: 8 }, // IT Development
  { id: 19, department_id: 4, position_id: 8 }, // Development (Company 2)
  { id: 20, department_id: 6, position_id: 8 }, // Engineering (Company 3)

  // Financial Analyst only in Finance department
  { id: 21, department_id: 7, position_id: 9 }, // Finance (Company 3)

  // Team Lead can work in multiple departments
  { id: 22, department_id: 1, position_id: 10 }, // IT Development
  { id: 23, department_id: 2, position_id: 10 }, // Medical
  { id: 24, department_id: 4, position_id: 10 }, // Development (Company 2)
  { id: 25, department_id: 6, position_id: 10 }, // Engineering (Company 3)
  { id: 26, department_id: 7, position_id: 10 }, // Finance (Company 3)

  // Project Manager can work across departments
  { id: 27, department_id: 1, position_id: 11 }, // IT Development
  { id: 28, department_id: 3, position_id: 11 }, // Administration
  { id: 29, department_id: 4, position_id: 11 }, // Development (Company 2)
  { id: 30, department_id: 5, position_id: 11 }, // Operations (Company 2)
  { id: 31, department_id: 6, position_id: 11 }, // Engineering (Company 3)
  { id: 32, department_id: 7, position_id: 11 }  // Finance (Company 3)
];