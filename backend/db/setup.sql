-- Drop tables in reverse dependency order
DROP TABLE IF EXISTS user_roles CASCADE;
DROP TABLE IF EXISTS employee_roles CASCADE;
DROP TABLE IF EXISTS role_menu_functionality CASCADE;
DROP TABLE IF EXISTS module_department CASCADE;
DROP TABLE IF EXISTS module_menu CASCADE;
DROP TABLE IF EXISTS menus CASCADE;
DROP TABLE IF EXISTS modules CASCADE;
DROP TABLE IF EXISTS company_modules CASCADE;
DROP TABLE IF EXISTS department_roles CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS employees CASCADE;
DROP TABLE IF EXISTS positions CASCADE;
DROP TABLE IF EXISTS department CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS employee_department CASCADE;

-- Drop enums after all tables are gone
DROP TYPE IF EXISTS tier_type CASCADE;
DROP TYPE IF EXISTS theme_type CASCADE;

-- 1. Create ENUM type for company tier
CREATE TYPE tier_type AS ENUM ('basic', 'pro', 'corporate');
CREATE TYPE theme_type AS ENUM ('red', 'blue', 'green', 'yellow', 'purple', 'orange');

-- 2. Create companies table
CREATE TABLE companies (
  company_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  logo VARCHAR(100) NOT NULL,
  tier tier_type NOT NULL,
  tenant_name VARCHAR(100) NOT NULL UNIQUE,
  additional JSONB,
  theme theme_type NOT NULL DEFAULT 'red'
);

-- 3. Create positions table
CREATE TABLE positions (
  position_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  additional JSONB,
  company_id INTEGER NOT NULL REFERENCES companies(company_id) ON DELETE CASCADE
);

-- 4. Create department table
CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  company_id INTEGER NOT NULL REFERENCES companies(company_id) ON DELETE CASCADE
);

-- 5. Create roles table (removed department_id - now handled by department_roles mapping)
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

--6. Create mapping department and roles table
CREATE TABLE department_roles (
  id SERIAL PRIMARY KEY,
  department_id INTEGER NOT NULL REFERENCES department(id) ON DELETE CASCADE,
  role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  UNIQUE (department_id, role_id)
);

-- 6. Create modules table (HRIS modules)
CREATE TABLE modules (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- 7. Create mapping modules and company
CREATE TABLE company_modules (
  id SERIAL PRIMARY KEY,
  module_id INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  company_id INTEGER NOT NULL REFERENCES companies(company_id) ON DELETE CASCADE,
  UNIQUE (module_id, company_id)
);

-- 8. Create mapping modules and department
CREATE TABLE module_department (
  id SERIAL PRIMARY KEY,
  module_id INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  department_id INTEGER NOT NULL REFERENCES department(id) ON DELETE CASCADE,
  UNIQUE (module_id, department_id)
);

-- 9. Create employees table (company and position foreign keys)
CREATE TABLE employees (
  employee_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  profile_picture VARCHAR(100),
  company_id INTEGER NOT NULL REFERENCES companies(company_id) ON DELETE CASCADE,
  position_id INTEGER NOT NULL REFERENCES positions(position_id)
);

-- 10. Create users table (linked to employee) - Fixed column name
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  password TEXT NOT NULL,  -- Changed from user_password to password
  email VARCHAR(100) NOT NULL UNIQUE,
  employee_id INTEGER NOT NULL REFERENCES employees(employee_id) ON DELETE CASCADE
);

-- 11. Create menus table (menus under modules)
CREATE TABLE menus (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  module_id INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE
);

-- 12. Create role menu
CREATE TABLE module_menu (
  id SERIAL PRIMARY KEY,
  module_id INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  menu_id INTEGER NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
  UNIQUE (module_id, menu_id)
);

-- 13. Create role menu functionality
CREATE TABLE role_menu_functionality (
  module_menu_id INTEGER NOT NULL REFERENCES module_menu(id) ON DELETE CASCADE,
  role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  functionality VARCHAR(50) NOT NULL,
  additional JSONB,
  PRIMARY KEY (role_id, module_menu_id)
);

-- 14. Create user roles
CREATE TABLE user_roles (
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

-- 15. Create employee department
CREATE TABLE employee_department (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(employee_id),
  department_id INTEGER REFERENCES department(id),
  UNIQUE (employee_id, department_id)
);