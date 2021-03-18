const Pool = require('pg').Pool

const pool = new Pool({
  user: 'financestracker',
  host: 'localhost',
  database: 'financestracker',
  password: '123',
  port: 5432,
})

module.exports = pool