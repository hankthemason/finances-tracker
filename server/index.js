const path = require('path');
const express = require('express');
const p = require('./db')
const db = require('./queries')
const cors = require('cors')
const bcrypt = require('bcrypt')
const session = require('express-session')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const Models = require('./models')
const U = require('./models/users')

let models = new Models(p)
models.init()

const initializePassport = require('./passportConfig');
const { restart } = require('nodemon');
initializePassport(passport)

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use(
  session({
    secret: "secret",

    resave: false,

    saveUninitialized: false
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
})

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', models.users.getUsers)

app.get('/api/expenses', async (req, res) => {
  const user_id = req.query.user_id
  const month = req.query.month
  const year = req.query.year
  const expenses = await models.expenses.getCurrentMonthExpenses(user_id, month, year)
  res.json(expenses)
})

app.get('/api/getTransactions', async (req, res) => {
  const { user_id, month, year, type } = req.query
  const transactions = await models[type].getTransactions(user_id, month, year)
  res.json(transactions)
})

app.get('/api/getUserExpensesInfo', async(req, res) => {
  const user_id = req.query.user_id
  const month = req.query.month
  const year = req.query.year

  try {
    const userExpensesInfo = await models.expenses.getUserExpensesInfo(user_id, month, year)
    return res.json(userExpensesInfo)
  } catch (error) {
    return res.status(400).json({ error: error.toString()})
  }
})

app.get('/api/getUserIncomeInfo', async(req, res) => {
  const user_id = req.query.user_id
  const month = req.query.month
  const year = req.query.year
  try {
    const userIncomeInfo = await models.income.getUserIncomeInfo(user_id, month, year)
    return res.json(userIncomeInfo)
  } catch (error) {
    return res.status(400).json({ error: error.toString()})
  }
})

app.get('/api/getExpensesCategoryTotals', async (req, res) => {
  const user_id  = req.query.user_id
  const month = req.query.month
  const year = req.query.year
  try {
    const totals = await models.expenses.getCategoryTotals(user_id, month, year)
    return res.json(totals)
  } catch (error) {
    return res.status(400).json({ error: error.toString()})
  }
})

app.get('/api/getIncomeCategoryTotals', async (req, res) => {
  const user_id  = req.query.user_id
  const month = req.query.month
  const year = req.query.year
  try {
    const totals = await models.income.getCategoryTotals(user_id, month, year)
    return res.json(totals)
  } catch (error) {
    return res.status(400).json({ error: error.toString()})
  }
})

app.get('/api/getCategories', async (req, res) => {
  const categories = await models.categories.getCategories(req.query.user_id)
  let expenseCategories = categories.filter(e => e.type === 'expenses')
  let incomeCategories = categories.filter(e => e.type === 'income')
  res.json({
    expenseCategories: expenseCategories,
    incomeCategories: incomeCategories
  })
})

app.post('/api/addCategory', async (req, res) => {
  let { user_id, category_name, type } = req.body
  try {
    const message = await models.categories.addCategory(user_id, category_name, type)
    return res.json(message)
  } catch(error) {
    return res.status(400).json({ error: error.toString()})
  }
})

app.post('/api/addItem', async (req, res, next) => {
  let type = req.query.type
  let { user_id, formState } = req.body
  let { amount, date, notes, category } = formState
  amount = parseFloat(amount)

  try {
    const message = await models[type].addItem(user_id, category, amount, notes, date)
    return res.json(message)
  } catch(error) {
    return res.status(400).json({ error: error.toString() })
  }
})

app.get('/api/income', async (req, res) => {
  const user_id = req.query.user_id
  const month = req.query.month
  const year = req.query.year
  const income = await models.income.getCurrentMonthIncome(user_id, month, year)
  res.json(income)
})

app.post('/api/register', async (req, res) => {
  let { username, email, password, password2 } = req.body

  //this might not even be necessary because I think the 
  //frontend component prevents any blank fields 
  let errors = []

  if (!username || !email || !password || !password2) {
    errors.push({ 
      type: "form",
      message: "Please enter all fields" })
  }

  let userExists = await models.users.userExists(email)
  if (userExists) {
    errors.push({
      type: "email", 
      message: "This email address has already been registered."})
  }

  const regex = `^(?=.{1,64}@)((?:[A-Za-z0-9!#$%&'*+-/=?^\{\|\}~]+|"(?:\\"|\\\\|[A-Za-z0-9\.!#\$%&'\*\+\-/=\?\^_{|}~ (),:;<>@[].])+")(?:.(?:[A-Za-z0-9!#$%&'*+-/=?^\{\|\}~]+|"(?:\\"|\\\\|[A-Za-z0-9\.!#\$%&'\*\+\-/=\?\^_{|}~ (),:;<>@[].])+")))@(?=.{1,255}.)((?:[A-Za-z0-9]+(?:(?:[A-Za-z0-9-][A-Za-z0-9])?).)+[A-Za-z]{2,})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|)])$`

  if (!email.match(regex)) {
    errors.push({
      type: "email",
      message: "Must be a valid email address."
    })
  }

  if (password.length < 6) {
    errors.push({ 
      type: "password",
      message: "Password should be at least 6 characters" })
  }

  if (password != password2) {
    errors.push({ 
      type: "password2",
      message: "Passwords do not match" });
  }

  if (errors.length > 0) {
    res.send({
      errors: errors
    })
  } else {
    //form validation has passed
    let hashedPassword = await bcrypt.hash(password, 10);

    let result = await models.users.createUser(username, email, hashedPassword)
    if (result) {
      res.send({message: "success"})
    }
  }
})

app.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(400).send({message: 'login error'});
    else {
      req.login(
        user,
        { session: false },
        async (error) => {
          if (error) return next(error);

          const body = { user_id: user.user_id, email: user.email };
          const token = jwt.sign({ user: body }, 'TOP_SECRET');

          return res.json({ token, user: {
            user_id: user.user_id,
            email: user.email,
            username: user.username
          } });
        }
      );
    }
  })(req, res, next);
});

module.exports = app
