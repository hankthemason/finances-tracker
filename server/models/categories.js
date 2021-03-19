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

  addCategory = async(user_id, category) => {
    try {
      await this.pool.query(
        `INSERT INTO categories (user_id, category_name)
        VALUES ($1, $2)`, [user_id, category]
      )
    } catch(err) {
      console.error(err)
    }
  }
}

module.exports = Categories