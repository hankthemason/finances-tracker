const path = require('path');
const express = require('express');
const db = require('./queries')
const cors = require('cors')

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

module.exports = app
