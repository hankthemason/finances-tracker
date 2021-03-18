const path = require('path');
const express = require('express');
const db = require('./queries')
const cors = require('cors')
const bcrypt = require('bcrypt')
const session = require('express-session')
const passport = require('passport')
const jwt = require('jsonwebtoken')

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

app.get('/users', db.getUsers)

app.post('/register', async (req, res) => {
  let { username, email, password, password2 } = req.body
  
  //this might not even be necessary because I think the 
  //frontend component prevents any blank fields 
  let errors = []

  if (!username || !email || !password || !password2) {
    errors.push({ 
      type: "form",
      message: "Please enter all fields" })
  }

  let userExists = await db.userExists(email)
  if (userExists) {
    errors.push({
      type: "email", 
      message: "This email address has already been registered."})
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

    let result = await db.createUser(username, email, hashedPassword)
    if (result) {
      res.send({message: "success"})
    }
  }
})

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(400).send({message: 'login failed'});
    else {
      req.login(
        user,
        { session: false },
        async (error) => {
          if (error) return next(error);

          const body = { id: user.id, email: user.email };
          const token = jwt.sign({ user: body }, 'TOP_SECRET');

          return res.json({ token });
        }
      );
    }
  })(req, res, next);
});

module.exports = app
