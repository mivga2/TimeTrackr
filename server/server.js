const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const Pool = require('pg').Pool
const pool = new Pool({
  connectionString: process.env.DBConnLink,
  ssl: {
      rejectUnauthorized: false
  }
});

const getUsers = async (request, response) => {
   const res = await pool.query('SELECT * FROM public."Users"', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
    console.log(res)
  })
}

app.get('/', (req, res) => {
  res.send('Hello from our server!')
})

app.get('/users', getUsers)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})