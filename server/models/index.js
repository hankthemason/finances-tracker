const Users = require('./users')
const Categories = require('./categories')
const Expenses = require('./expenses')
const Income = require('./income')

class Models {
  constructor(pool) {
    this.pool = pool
  }

  async init() {

    this.users = new Users(this.pool)
    this.categories = new Categories(this.pool)
    this.expenses = new Expenses(this.pool)
    this.income = new Income(this.pool)

    await this.users.init()
    await this.categories.init()
    await this.expenses.init()
    await this.income.init()
  }
}

module.exports = Models