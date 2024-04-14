import express from 'express'
import bodyParser from 'body-parser'
const app = express()
const port = 3000
import cors from 'cors'
import dotenv from 'dotenv'
import pg from 'pg'
const { Pool } = pg
dotenv.config();

import * as q from './queries.js'

app.use(cors())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

export const pool = new Pool({
  connectionString: process.env.DBConnLink,
  ssl: {
      rejectUnauthorized: false
  }
});


// const Pool = require('pg').Pool
// const pool = new Pool({
//   connectionString: process.env.DBConnLink,
//   ssl: {
//       rejectUnauthorized: false
//   }
// });

// const getUsers = async (request, response) => {
//    const res = await pool.query('SELECT * FROM public."Users"', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//     console.log(res)
//   })
// }

app.get('/', (req, res) => {
  res.send('Hello from our server!')
})

// app.get('/users', getUsers)

app.get('/api/v1/events', q.getAllEvents)
app.get('/api/v1/tasks', q.getAllTasks)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})