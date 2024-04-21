import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
const { Pool } = pg;
dotenv.config();

import * as q from "./queries.js";

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

export const pool = new Pool({
  // eslint-disable-next-line no-undef
  connectionString: process.env.DBConnLink,
  ssl: {
    rejectUnauthorized: false,
  },
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

app.get("/", (req, res) => {
  res.send("Hello from our server!");
});

// get list of all items
app.get("/api/v1/events", q.getAllEvents);
app.get("/api/v1/tasks", q.getAllTasks);

// get item by id
app.get("/api/v1/user/:id", q.getUserById);
app.get("/api/v1/user/:username/:password", q.getUserByName);
app.get("/api/v1/event/:id", q.getEventById);
app.get("/api/v1/task/:id", q.getTaskById);

// create new item
app.post("/api/v1/event", q.postEvent);
app.post("/api/v1/task", q.postTask);
app.post("/api/v1/user", q.postUser);

// update item by id
app.put("/api/v1/event/:id", q.putEventById);
app.put("/api/v1/task/:id", q.putTaskById);

// delete item by id
app.delete("/api/v1/user/:id", q.deleteUserById);
app.delete("/api/v1/event/:id", q.deleteEventById);
app.delete("/api/v1/task/:id", q.deleteTaskById);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
