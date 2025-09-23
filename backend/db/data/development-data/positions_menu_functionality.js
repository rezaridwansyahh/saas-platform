module.exports = [
  // Senior Developer (position_id: 1) - Full access to Employee Management & Payroll
  { module_menu_id: 1, position_id: 1, functionality: 'read', additional: {} },
  { module_menu_id: 1, position_id: 1, functionality: 'write', additional: {} },
  { module_menu_id: 1, position_id: 1, functionality: 'update', additional: {} },
  { module_menu_id: 1, position_id: 1, functionality: 'delete', additional: {} },

  { module_menu_id: 2, position_id: 1, functionality: 'read', additional: {} },
  { module_menu_id: 2, position_id: 1, functionality: 'write', additional: {} },
  { module_menu_id: 2, position_id: 1, functionality: 'update', additional: {} },
  { module_menu_id: 2, position_id: 1, functionality: 'delete', additional: {} },

  { module_menu_id: 3, position_id: 1, functionality: 'read', additional: {} },
  { module_menu_id: 3, position_id: 1, functionality: 'write', additional: {} },
  { module_menu_id: 3, position_id: 1, functionality: 'update', additional: {} },
  { module_menu_id: 3, position_id: 1, functionality: 'delete', additional: {} },

  // Junior Developer (position_id: 2) - Limited access
  { module_menu_id: 1, position_id: 2, functionality: 'read', additional: {} },
  { module_menu_id: 2, position_id: 2, functionality: 'read', additional: {} },
  { module_menu_id: 2, position_id: 2, functionality: 'write', additional: {} },

  // Lead Doctor (position_id: 3) - Access to Employee List + Time Tracking
  { module_menu_id: 1, position_id: 3, functionality: 'read', additional: {} },
  { module_menu_id: 1, position_id: 3, functionality: 'write', additional: {} },
  { module_menu_id: 4, position_id: 3, functionality: 'read', additional: {} },
  { module_menu_id: 5, position_id: 3, functionality: 'read', additional: {} },

  // Dentist (position_id: 4) - Limited access to Time Tracking
  { module_menu_id: 4, position_id: 4, functionality: 'read', additional: {} },
  { module_menu_id: 5, position_id: 4, functionality: 'read', additional: {} },

  // Admin Staff (position_id: 5) - Full access to Employee Management, Payroll & Time Tracking
  { module_menu_id: 1, position_id: 5, functionality: 'read', additional: {} },
  { module_menu_id: 1, position_id: 5, functionality: 'write', additional: {} },
  { module_menu_id: 1, position_id: 5, functionality: 'update', additional: {} },
  { module_menu_id: 1, position_id: 5, functionality: 'delete', additional: {} },

  { module_menu_id: 2, position_id: 5, functionality: 'read', additional: {} },
  { module_menu_id: 2, position_id: 5, functionality: 'write', additional: {} },
  { module_menu_id: 2, position_id: 5, functionality: 'update', additional: {} },
  { module_menu_id: 2, position_id: 5, functionality: 'delete', additional: {} },

  { module_menu_id: 3, position_id: 5, functionality: 'read', additional: {} },
  { module_menu_id: 3, position_id: 5, functionality: 'write', additional: {} },
  { module_menu_id: 3, position_id: 5, functionality: 'update', additional: {} },
  { module_menu_id: 3, position_id: 5, functionality: 'delete', additional: {} },

  { module_menu_id: 4, position_id: 5, functionality: 'read', additional: {} },
  { module_menu_id: 4, position_id: 5, functionality: 'write', additional: {} },
  { module_menu_id: 4, position_id: 5, functionality: 'update', additional: {} },
  { module_menu_id: 4, position_id: 5, functionality: 'delete', additional: {} },

  { module_menu_id: 5, position_id: 5, functionality: 'read', additional: {} },
  { module_menu_id: 5, position_id: 5, functionality: 'write', additional: {} },
  { module_menu_id: 5, position_id: 5, functionality: 'update', additional: {} },
  { module_menu_id: 5, position_id: 5, functionality: 'delete', additional: {} },
];
