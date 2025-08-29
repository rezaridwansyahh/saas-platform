-- Sync sequence values for all tables

SELECT setval('companies_company_id_seq', (SELECT MAX(company_id) FROM companies));

SELECT setval('employees_employee_id_seq', (SELECT MAX(employee_id) FROM employees));

SELECT setval('positions_position_id_seq', (SELECT MAX(position_id) FROM positions));

SELECT setval('users_user_id_seq', (SELECT MAX(user_id) FROM users));

SELECT setval('groups_management_group_id_seq', (SELECT MAX(group_id) FROM groups_management));

SELECT setval('roles_role_id_seq', (SELECT MAX(role_id) FROM roles));

SELECT setval('modules_module_id_seq', (SELECT MAX(module_id) FROM modules));

SELECT setval('menus_menu_id_seq', (SELECT MAX(menu_id) FROM menus));

SELECT setval('functionalities_functionalities_id_seq', (SELECT MAX(functionalities_id) FROM functionalities));

SELECT setval('role_permissions_permission_id_seq', (SELECT MAX(permission_id) FROM role_permissions));

