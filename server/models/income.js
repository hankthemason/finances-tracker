class Income {
  constructor(pool) {
    this.pool = pool
  }

  init = async() => {
    try {
      await this.pool.query(
        `CREATE TABLE IF NOT EXISTS income (
            income_id serial PRIMARY KEY,
            user_id INT NOT NULL,
            category_name VARCHAR (50) NOT NULL,
            amount INT NOT NULL,
            timestamp timestamptz default current_timestamp,
            notes VARCHAR (200),
            FOREIGN KEY (user_id)
              REFERENCES users (user_id),
            FOREIGN KEY (category_name) 
              REFERENCES categories (category_name)
        )`
      )
    } catch(err) {
      console.error(err)
    }
  }

  getTotalIncomeByMonth = async (user_id, month) => {
    try {
      const result = await this.pool.query (
        `SELECT SUM(amount) AS TOTAL
        FROM income
        WHERE user_id = $1
        AND EXTRACT(MONTH FROM timestamp) = $2`, 
        [user_id, month]
      )
      return result.rows[0].total
    } catch(err) {
      console.error(err)
    }
  }

  addItem = async(user_id, category, amount, notes, date) => {
    const result = await this.pool.query(
      `INSERT INTO income (user_id, category_name, amount, notes, timestamp)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING income_id`, [user_id, category, amount, notes, date]
    )
    return result.rows[0]
  }

  getCategoryTotals = async (user_id, month) => {
    try {
      const result = await this.pool.query (
        `SELECT category_name, CAST (SUM (amount) AS FLOAT) AS total
        FROM income
        WHERE user_id = $1 
        AND EXTRACT(MONTH FROM timestamp) = $2
        GROUP BY category_name`,
        [user_id, month]
      )
      console.log(result)
      return result.rows
    } catch(err) {
      console.error(err)
    }
  }

}

module.exports = Income