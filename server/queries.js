const Pool = require('pg').Pool
const pool = new Pool({
  user: 'financestracker',
  host: 'localhost',
  database: 'financestracker',
  password: '123',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getUsers,
  // getUserById,
  // createUser,
  // updateUser,
  // deleteUser,
}