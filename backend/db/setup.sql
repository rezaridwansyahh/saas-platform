DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS users;

-- 1. Create ENUM type first
CREATE TYPE tier_type AS ENUM ('basic', 'pro', 'coorperate');

-- 2. Create companies table
CREATE TABLE companies (
  company_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  logo VARCHAR(100) NOT NULL,
  tier tier_type NOT NULL,
  additional JSONB NOT NULL
);

-- 3. Createa employees table (include company_id column before FK)
CREATE TABLE employees (
  employee_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  profile_picture VARCHAR(100) NOT NULL,
  company_id INTEGER NOT NULL,
  FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE,
  FOREIGN KEY (position_id) REFERENCES positions(position_id)
);

-- 4. Create positions table
CREATE TABLE positions (
  position_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  additional JSONB NOT NULL,
)

-- 5. Create users table (renamed from USER + fix FK column)
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_password TEXT NOT NULL,
  Email VARCHAR(100) NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);