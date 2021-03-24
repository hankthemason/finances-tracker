class Categories {
  constructor(pool) {
    this.pool = pool
  }

  init = async() => {
    try {
      await this.pool.query(
        `CREATE TABLE IF NOT EXISTS categories (
            category_id serial PRIMARY KEY,
            category_name VARCHAR (50) UNIQUE NOT NULL,
            user_id INT NOT NULL,
            type VARCHAR (20) NOT NULL,
            FOREIGN KEY (user_id)
              REFERENCES users (user_id)
        )`
      )
    } catch(err) {
      console.error(err)
    }
  }

  addCategory = async(user_id, category, type) => {
    const result = await this.pool.query(
      `INSERT INTO categories (user_id, category_name, type)
      VALUES ($1, $2, $3)
      RETURNING category_id;`, [user_id, category, type]
    )
    return result.rows[0]
  }

  getCategories = async(user_id) => {
    try {
      const result = await this.pool.query(
        `SELECT category_name, type 
        FROM categories
        WHERE user_id = $1`, [user_id])
        return result.rows
    } catch(err) {
      console.error(err)
    }
  }
}

module.exports = Categories