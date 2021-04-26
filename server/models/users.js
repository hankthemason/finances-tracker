class Users {
  constructor(pool) {
    this.pool = pool
  }

  init = async() => { try {
      await this.pool.query(
        `CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            email VARCHAR(50) NOT NULL,
            password VARCHAR(200) NOT NULL
        )`
      )
    } catch(err) {
      console.error(err)
    }
  }

  getUsers = async (request, response) => {
    this.pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  userExists = async (email) => {
    return new Promise((resolve, reject) => {
      this.pool.query(
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
  
  createUser = async (username, email, password) => {
    try {
      const result = await this.pool.query(
        `INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING user_id, password`, 
        [username, email, password]
      )
      return result.rows[0]
    } catch(err) {
      console.error(err)
    }
  }

}

module.exports = Users