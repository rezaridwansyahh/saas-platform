-- Drop tables in reverse dependency order
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS positions;
DROP TABLE IF EXISTS companies;

-- Drop enum if it exists
DO $$ BEGIN
  DROP TYPE IF EXISTS tier_type;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- 1. Create ENUM type for company tier
CREATE TYPE tier_type AS ENUM ('basic', 'pro', 'coorperate');

-- 2. Create companies table
CREATE TABLE companies (
  company_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  logo VARCHAR(100) NOT NULL,
  tier tier_type NOT NULL,
  tenant_name VARCHAR(100) NOT NULL UNIQUE,
  additional JSONB 
);

-- 3. Create positions table
CREATE TABLE positions (
  position_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  additional JSONB,
  company_id INTEGER NOT NULL REFERENCES companies(company_id) ON DELETE CASCADE
);

-- 4. Create employees table (company and position foreign keys)
CREATE TABLE employees (
  employee_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  profile_picture VARCHAR(100),
  company_id INTEGER NOT NULL REFERENCES companies(company_id) ON DELETE CASCADE,
  position_id INTEGER NOT NULL REFERENCES positions(position_id)
);

-- 5. Create users table (linked to employee)
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_password TEXT NOT NULL,
  email VARCHAR(100) NOT NULL,
  employee_id INTEGER NOT NULL REFERENCES employees(employee_id) ON DELETE CASCADE
);
