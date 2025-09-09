module.exports = [
  // Senior Developer (role_id: 1) - Full access to Employee Management
  { module_menu_id: 2, role_id: 1, functionality: 'read', additional: {} },
  { module_menu_id: 2, role_id: 1, functionality: 'write', additional: {} },
  { module_menu_id: 2, role_id: 1, functionality: 'delete', additional: {} },
  { module_menu_id: 1, role_id: 1, functionality: 'read', additional: {} },
  { module_menu_id: 1, role_id: 1, functionality: 'write', additional: {} },
  { module_menu_id: 1, role_id: 1, functionality: 'delete', additional: {} },
  
  // Junior Developer (role_id: 2) - Limited access to Employee Management
  { module_menu_id: 1, role_id: 2, functionality: 'read', additional: {} },
  { module_menu_id: 2, role_id: 2, functionality: 'read', additional: {} },
  { module_menu_id: 2, role_id: 2, functionality: 'write', additional: {} },
  
  // Lead Doctor (role_id: 3) - Access to Employee List and Time Tracking
  { module_menu_id: 1, role_id: 3, functionality: 'read', additional: {} },
  { module_menu_id: 1, role_id: 3, functionality: 'write', additional: {} },
  { module_menu_id: 5, role_id: 3, functionality: 'read', additional: {} },
  { module_menu_id: 5, role_id: 3, functionality: 'write', additional: {} },
  { module_menu_id: 6, role_id: 3, functionality: 'read', additional: {} },
  
  // Dentist (role_id: 4) - Limited access to time tracking
  { module_menu_id: 5, role_id: 4, functionality: 'read', additional: {} },
  { module_menu_id: 5, role_id: 4, functionality: 'write', additional: {} },
  { module_menu_id: 6, role_id: 4, functionality: 'read', additional: {} },
  
  // Admin Staff (role_id: 5) - Full access to Employee Management and Payroll
  { module_menu_id: 1, role_id: 5, functionality: 'read,', additional: {} },
  { module_menu_id: 1, role_id: 5, functionality: 'write', additional: {} },
  { module_menu_id: 1, role_id: 5, functionality: 'delete', additional: {} },
  { module_menu_id: 2, role_id: 5, functionality: 'read', additional: {} },
  { module_menu_id: 2, role_id: 5, functionality: 'write', additional: {} },
  { module_menu_id: 2, role_id: 5, functionality: 'delete', additional: {} },
  { module_menu_id: 3, role_id: 5, functionality: 'read', additional: {} },
  { module_menu_id: 3, role_id: 5, functionality: 'write', additional: {} },
  { module_menu_id: 4, role_id: 5, functionality: 'read', additional: {} },
  { module_menu_id: 4, role_id: 5, functionality: 'write', additional: {} },
  
  // Full Stack Developer (role_id: 6) - PT Anytime Fitness
  { module_menu_id: 7, role_id: 6, functionality: 'read', additional: {} },
  { module_menu_id: 7, role_id: 6, functionality: 'write', additional: {} },
  { module_menu_id: 8, role_id: 6, functionality: 'read', additional: {} },
  { module_menu_id: 8, role_id: 6, functionality: 'write', additional: {} },
  
  // DevOps Engineer (role_id: 7) - System level access
  { module_menu_id: 7, role_id: 7, functionality: 'read', additional: {} },
  { module_menu_id: 9, role_id: 7, functionality: 'read', additional: {} },
  
  // Software Engineer (role_id: 8) - Development access
  { module_menu_id: 7, role_id: 8, functionality: 'read', additional: {} },
  { module_menu_id: 7, role_id: 8, functionality: 'write', additional: {} },
  { module_menu_id: 8, role_id: 8, functionality: 'read', additional: {} },
  { module_menu_id: 8, role_id: 8, functionality: 'write', additional: {} },
  
  // Financial Analyst (role_id: 9) - PT Optima Finance access
  { module_menu_id: 11, role_id: 9, functionality: 'read', additional: {} },
  { module_menu_id: 11, role_id: 9, functionality: 'write', additional: {} },
  
  // Team Lead (role_id: 10) - Team management access
  { module_menu_id: 10, role_id: 10, functionality: 'read', additional: {} },
  { module_menu_id: 10, role_id: 10, functionality: 'write', additional: {} },
  { module_menu_id: 11, role_id: 10, functionality: 'read', additional: {} },
  
  // Project Manager (role_id: 11) - Project oversight access
  { module_menu_id: 10, role_id: 11, functionality: 'read', additional: {} },
  { module_menu_id: 11, role_id: 11, functionality: 'read', additional: {} },
  { module_menu_id: 11, role_id: 11, functionality: 'write', additional: {} }
];