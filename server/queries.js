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

const userExists = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM users 
      WHERE email = $1`, [email], (err, results) => {
        if (err) {
          return reject(err) 
        }
      
        if (results.rows.length > 0) {
          resolve(true)
        }

        resolve(false)
      }
    )
  })
}

module.exports = {
  getUsers,
  userExists,
  // getUserById,
  // createUser,
  // updateUser,
  // deleteUser,
}