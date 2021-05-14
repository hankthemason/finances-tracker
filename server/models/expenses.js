const { restart } = require("nodemon")

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
              REFERENCES categories(category_name)
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

  getUserExpensesInfo = async(user_id, month, year) => {
    try {
      const result = await this.pool.query (
        `SELECT
        CAST (SUM (x.total) AS MONEY) AS total,
        json_agg(json_build_object('category_name', x.category_name, 'total', x.total)) AS category_totals
        FROM (
          SELECT 
            category_name, CAST (SUM (amount) AS MONEY) AS total
          FROM expenses
          WHERE user_id = $1
          AND EXTRACT(MONTH FROM timestamp) = $2
          AND EXTRACT(YEAR FROM timestamp) = $3
          GROUP BY category_name) AS x
          `, 
        [user_id, month, year]
      )
      return result.rows[0]
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
      return (err)
      console.error(err)
    }
  }

  getCurrentMonthExpenses = async (user_id, month, year) => {
    try {
      const result = await this.pool.query (
        `SELECT CAST(SUM(amount) AS MONEY) AS total
        FROM expenses 
        WHERE user_id = $1
        AND EXTRACT(MONTH FROM timestamp) = $2
        AND EXTRACT(YEAR FROM timestamp) = $3`,
        [user_id, month, year]
      )
      return result.rows[0].total
    } catch(err) {
      console.error(err)
    }
  }
  
  getCategoryTotals = async (user_id, month, year) => {
    try {
      const result = await this.pool.query (
        `SELECT category_name, CAST (SUM (amount) AS FLOAT) AS total
        FROM expenses
        WHERE user_id = $1 
        AND EXTRACT(MONTH FROM timestamp) = $2
        AND EXTRACT(YEAR FROM timestamp) = $3
        GROUP BY category_name`,
        [user_id, month, year]
      )
      return result.rows
    } catch(err) {
      console.error(err)
    }
  }

  addItem = async(user_id, category, amount, notes, date) => {
    const result = await this.pool.query(
      `INSERT INTO expenses (user_id, category_name, amount, notes, timestamp)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING expense_id`, [user_id, category, amount, notes, date]
    )
    return result.rows[0]
  }
}

module.exports = Expenses