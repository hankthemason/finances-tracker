const pool = require('./db')

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

const createUser = async (username, email, password) => {
  try {
    const result = await pool.query(
      `INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, password`, 
      [username, email, password]
    )
    return result.rows[0]
  } catch(err) {
    console.error(err)
  }
}

module.exports = {
  pool,
  getUsers,
  userExists,
  createUser,
  // getUserById,
  // createUser,
  // updateUser,
  // deleteUser,
}