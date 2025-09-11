-- Sync sequence values for all tables

SELECT setval('companies_company_id_seq', (SELECT MAX(company_id) FROM companies));

SELECT setval('employees_employee_id_seq', (SELECT MAX(employee_id) FROM employees));

SELECT setval('positions_position_id_seq', (SELECT MAX(position_id) FROM positions));

SELECT setval('users_user_id_seq', (SELECT MAX(user_id) FROM users));

SELECT setval('roles_role_id_seq', (SELECT MAX(role_id) FROM roles));

SELECT setval('modules_id_seq', (SELECT MAX(id) FROM modules));

SELECT setval('menus_id_seq', (SELECT MAX(id) FROM menus));

