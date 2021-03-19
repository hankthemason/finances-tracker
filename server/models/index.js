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

    await this.categories.init()
  }
}

module.exports = Models