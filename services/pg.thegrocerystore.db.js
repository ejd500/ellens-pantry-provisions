const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'TheGroceryStore',
  password: 'Keyin2021',
  port: 5432,
});

if(DEBUG) console.log("connected to PostgreSQL...");

module.exports = pool;