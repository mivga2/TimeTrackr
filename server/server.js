import express from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
const { Pool } = pg;
dotenv.config();

import * as tq from "./task-queries.js";
import * as eq from "./event-queries.js";
import * as uq from "./user-queries.js";
import * as fq from "./friend-queries.js";
import * as cq from "./calendar-queries.js";

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

app.get("/", (req, res) => {
  res.send("Hello from our server!");
});

// get list of all items
app.get("/api/v1/events", eq.getAllEvents);
app.get("/api/v1/tasks", tq.getAllTasks);
app.get("/api/v1/friends", (req, res) => {
  fq.getAllFriends(req, res);
});
app.get("/api/v1/users", uq.getAllUsers);
app.get("/api/v1/requests", fq.getAllPendingFriendRequests);
app.get("/api/v1/sent-requests", fq.getAllSentFriendRequests);
app.get("/api/v1/calendars", cq.getAllOwnedCalendars);
app.get("/api/v1/events/:calendar_id", cq.getAllEventsByCalId);

// get item by id
app.get("/api/v1/user/:id", uq.getUserById);
app.get("/api/v1/user/name/:username", uq.getUserByName);
app.get("/api/v1/user/:username/:password", uq.getUserByNamePass);
app.get("/api/v1/event/:id", eq.getEventById);
app.get("/api/v1/task/:id", tq.getTaskById);

// create new item
app.post("/api/v1/event", eq.postEvent);
app.post("/api/v1/task", tq.postTask);
app.post("/api/v1/user", uq.postUser);
app.post("/api/v1/friend-request", fq.postFriendRequest);

// update item by id
app.put("/api/v1/event/:id", eq.putEventById);
app.put("/api/v1/task/:id", tq.putTaskById);

// update friend request by receiver
app.put(
  "/api/v1/friend-request/sender/:send_id/receiver/:receive_id",
  fq.putRequestByIds
);

// delete item by id
app.delete("/api/v1/user/:id", uq.deleteUserById);
app.delete("/api/v1/event/:id", eq.deleteEventById);
app.delete("/api/v1/task/:id", tq.deleteTaskById);
app.delete(
  "/api/v1/friend-request/sender/:send_id/receiver/:receive_id",
  fq.deleteFriendByIds
);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
