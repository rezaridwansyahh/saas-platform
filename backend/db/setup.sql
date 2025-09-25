-- Drop tables in reverse dependency order
DROP TABLE IF EXISTS users_positions CASCADE;
DROP TABLE IF EXISTS positions_menus_functionalities CASCADE;
DROP TABLE IF EXISTS modules_companies CASCADE;
DROP TABLE IF EXISTS modules_departments CASCADE;
DROP TABLE IF EXISTS modules_menus CASCADE;
DROP TABLE IF EXISTS menus CASCADE;
DROP TABLE IF EXISTS modules CASCADE;
DROP TABLE IF EXISTS sectors_roles_access CASCADE;
DROP TABLE IF EXISTS sectors_companies CASCADE;
DROP TABLE IF EXISTS sectors_roles CASCADE;
DROP TABLE IF EXISTS sectors CASCADE;
DROP TABLE IF EXISTS departments_positions CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS employees CASCADE;
DROP TABLE IF EXISTS positions CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS employees_departments CASCADE;

-- Drop enums after all tables are gone
DROP TYPE IF EXISTS tier_type CASCADE;
DROP TYPE IF EXISTS theme_type CASCADE;

-- 1. Create ENUM type for company tier
CREATE TYPE tier_type AS ENUM ('basic', 'pro', 'corporate');
CREATE TYPE theme_type AS ENUM ('red', 'blue', 'green', 'yellow', 'purple', 'orange');

-- 2. Create companies table
CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  logo VARCHAR(100) NOT NULL,
  tier tier_type NOT NULL,
  tenant_name VARCHAR(100) NOT NULL UNIQUE,
  additional JSONB,
  theme theme_type NOT NULL DEFAULT 'red'
);

-- 3. Create roles table
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  additional JSONB,
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE
);

-- 4. Create departments table
CREATE TABLE departments(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE
);

-- 5. Create positions table
CREATE TABLE positions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- 6. Create sectors table
CREATE TABLE sectors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- 7. Create sectors_companies mapping table
CREATE TABLE sectors_companies (
  id SERIAL PRIMARY KEY,
  sector_id INTEGER NOT NULL REFERENCES sectors(id) ON DELETE CASCADE,
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  UNIQUE (sector_id, company_id)
);

-- 8. Create sectors_roles_access mapping table
CREATE TABLE sectors_roles_access (
  id SERIAL PRIMARY KEY,
  sector_company_id INTEGER NOT NULL REFERENCES sectors_companies(id) ON DELETE CASCADE,
  role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  access VARCHAR(50) NOT NULL,
  UNIQUE (sector_company_id, role_id, access)
);

-- 9. Create departments_positions mapping table
CREATE TABLE departments_positions (
  id SERIAL PRIMARY KEY,
  department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  position_id INTEGER NOT NULL REFERENCES positions(id) ON DELETE CASCADE,
  UNIQUE (department_id, position_id)
);

-- 10. Create modules table
CREATE TABLE modules (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- 11. Create modules_companies mapping table
CREATE TABLE modules_companies (
  id SERIAL PRIMARY KEY,
  module_id INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  UNIQUE (module_id, company_id)
);

-- 12. Create modules_departments mapping table
CREATE TABLE modules_departments (
  id SERIAL PRIMARY KEY,
  module_id INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  UNIQUE (module_id, department_id)
);

-- 13. Create employees table
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  profile_picture VARCHAR(100),
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  role_id INTEGER REFERENCES roles(id)
);

-- 14. Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  password TEXT NOT NULL,  -- Changed from user_password to password
  email VARCHAR(100) NOT NULL UNIQUE,
  employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE
);

-- 15. Create menus table
CREATE TABLE menus (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  module_id INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE
);

-- 16. Create modules_menus mapping table
CREATE TABLE modules_menus (
  id SERIAL PRIMARY KEY,
  module_id INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  menu_id INTEGER NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
  UNIQUE (module_id, menu_id)
);

-- 17. Create positions_menus_functionalities mapping table
CREATE TABLE positions_menus_functionalities (
  id SERIAL PRIMARY KEY,
  module_menu_id INTEGER NOT NULL REFERENCES modules_menus(id) ON DELETE CASCADE,
  position_id INTEGER NOT NULL REFERENCES positions(id) ON DELETE CASCADE,
  functionality VARCHAR(50) NOT NULL,
  additional JSONB
);

-- 18. Create users_positions mapping table
CREATE TABLE users_positions (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  position_id INTEGER REFERENCES positions(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, position_id)
);

-- 19. Create employees_departments mapping table
CREATE TABLE employees_departments (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  department_id INTEGER REFERENCES departments(id),
  UNIQUE (employee_id, department_id)
);