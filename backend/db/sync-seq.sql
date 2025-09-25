-- Sync sequence values for all tables

SELECT setval('companies_id_seq', (SELECT MAX(id) FROM companies));

SELECT setval('employees_id_seq', (SELECT MAX(id) FROM employees));

SELECT setval('positions_id_seq', (SELECT MAX(id) FROM positions));

SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));

SELECT setval('roles_id_seq', (SELECT MAX(id) FROM roles));

SELECT setval('modules_id_seq', (SELECT MAX(id) FROM modules));

SELECT setval('menus_id_seq', (SELECT MAX(id) FROM menus));

SELECT setval('modules_companies_id_seq', (SELECT MAX(id) FROM modules_companies));