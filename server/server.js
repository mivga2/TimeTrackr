import express from "express";
import session from "express-session";
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

app.use(
  session({
    // eslint-disable-next-line no-undef
    secret: process.env.SessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

export const pool = new Pool({
  // eslint-disable-next-line no-undef
  connectionString: process.env.DBConnLink,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get("/", (req, res) => {
  res.send("Hello from our server!");
  const sessionData = req.session;
  console.log(sessionData)
  // res.send(sessionData)
});

// get list of all items
app.get("/api/v1/events", q.getAllEvents);
app.get("/api/v1/tasks", q.getAllTasks);
app.get("/api/v1/friends", q.getAllFriends);
app.get("/api/v1/users", q.getAllUsers);
app.get("/api/v1/requests", q.getAllPendingFriendRequests);
app.get("/api/v1/sent-requests", q.getAllSentFriendRequests);

// get item by id
app.get("/api/v1/user/:id", q.getUserById);
app.get("/api/v1/user/:username/:password", q.getUserByName);
app.get("/api/v1/event/:id", q.getEventById);
app.get("/api/v1/task/:id", q.getTaskById);

// create new item
app.post("/api/v1/event", q.postEvent);
app.post("/api/v1/task", q.postTask);
app.post("/api/v1/user", q.postUser);
app.post("/api/v1/friend-request", q.postFriendRequest);

// update item by id
app.put("/api/v1/event/:id", q.putEventById);
app.put("/api/v1/task/:id", q.putTaskById);

// update friend request by receiver
app.put("/api/v1/friend-request/sender/:send_id/receiver/:receive_id", q.putRequestByIds);

// delete item by id
app.delete("/api/v1/user/:id", q.deleteUserById);
app.delete("/api/v1/event/:id", q.deleteEventById);
app.delete("/api/v1/task/:id", q.deleteTaskById);
app.delete("/api/v1/friend-request/sender/:send_id/receiver/:receive_id", q.deleteFriendByIds);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
