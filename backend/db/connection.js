const { Pool } = require('pg');

require('dotenv').config({ path: '.env.test' });

const DBPORT = process.env.DBPORT;

const db = new Pool ({
  user: 'testingdb',
  host: 'postgres',
  database: 'testingdb',
  password: 'testingdb',
  port: PORT,
});

module.exports = db;
