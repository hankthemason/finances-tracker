const path = require('path');
const express = require('express');
const db = require('./queries')
const cors = require('cors')
const bcrypt = require('bcrypt')

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
})

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  })
})

app.get('/users', db.getUsers)

app.post('/register', async (req, res) => {
  let { username, email, password, password2 } = req.body
  // console.log({ 
  //   username, 
  //   email,
  //   password,
  //   password2
  // })
  
  //this might not even be necessary because I think the 
  //frontend component prevents any blank fields 
  let errors = []

  if (!username || !email || !password || !password2) {
    errors.push({ message: "Please enter all fields" })
  }

  if (password.length < 6) {
    errors.push({ message: "Password should be at least 6 characters" })
  }

  if (password != password2) {
    errors.push({ message: "Passwords do not match" });
  }

  if (errors.length > 0) {
    res.send({
      errors: errors
    })
  } else {
    //form validation has passed
    let hashedPassword = await bcrypt.hash(password, 10);
    let userExists = await db.userExists(email)
    if (userExists) {
      errors.push({ message: "This email address has already been registered."})
    }
    console.log(errors)
  }
})

module.exports = app
