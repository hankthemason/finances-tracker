class Expenses {
  constructor(pool) {
    this.pool = pool
  }

  init = async() => {
    try {
      await this.pool.query(
        `CREATE TABLE IF NOT EXISTS expenses (
            expense_id serial PRIMARY KEY,
            user_id INT NOT NULL,
            category_name VARCHAR (50) NOT NULL,
            amount NUMERIC(10, 2) NOT NULL,
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

  getExpenses = async (user_id) => {
    try {
      const result = await this.pool.query (
        `SELECT * 
        FROM expenses
        WHERE user_id = $1`, [user_id]
      )
      return result.rows
    } catch (err) {
      console.error(err)
    }
  }

  getExpensesByMonth = async (user_id, month) => {
    try {
      const result = await this.pool.query (
        `SELECT * 
        FROM expenses 
        WHERE user_id = $1
        AND EXTRACT(MONTH FROM timestamp) = $2`, 
        [user_id, month]
      )
      return result.rows
    } catch(err) {
      console.error(err)
    }
  }

  getTotalExpensesByMonth = async (user_id, month) => {
    try {
      const result = await this.pool.query (
        `SELECT SUM(amount) AS TOTAL
        FROM expenses 
        WHERE user_id = $1
        AND EXTRACT(MONTH FROM timestamp) = $2`, 
        [user_id, month]
      )
      return result.rows[0].total
    } catch(err) {
      console.error(err)
    }
  } 
}

module.exports = Expenses