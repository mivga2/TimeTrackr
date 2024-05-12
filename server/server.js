import express from "express";
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
import { verifyToken } from "./auth.js";

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
app.get("/api/v1/events", verifyToken, eq.getAllEvents);
app.get("/api/v1/tasks", verifyToken, tq.getAllTasks);
app.get("/api/v1/friends", verifyToken, fq.getAllFriends);
app.get("/api/v1/users", verifyToken, uq.getAllUsers);
app.get("/api/v1/requests", verifyToken, fq.getAllPendingFriendRequests);
app.get("/api/v1/sent-requests", verifyToken, fq.getAllSentFriendRequests);
app.get("/api/v1/calendars", verifyToken, cq.getAllOwnedCalendars);
app.get("/api/v1/shared/calendars", verifyToken, cq.getAllSharedCalendars);
app.get("/api/v1/events/:calendar_id", verifyToken, cq.getAllEventsByCalId);

// get item by id
app.get("/api/v1/user/:id", verifyToken, uq.getUserById); //not used?
app.get("/api/v1/user/name/:username", uq.getUserByName);
app.get("/api/v1/user/:username/:password", uq.getUserByNamePass);
app.get("/api/v1/event/:id", verifyToken, eq.getEventById);
app.get("/api/v1/task/:id", verifyToken, tq.getTaskById);

// create new item
app.post("/api/v1/event", verifyToken, eq.postEvent);
app.post("/api/v1/task", verifyToken, tq.postTask);
app.post("/api/v1/user", uq.postUser);
app.post("/api/v1/friend-request", verifyToken, fq.postFriendRequest);
app.post("/api/v1/calendar/share/:calendar_id", verifyToken, cq.postCalendarPermission);
app.post("/api/v1/calendar", verifyToken, cq.postCalendar);

// update item by id
app.put("/api/v1/event/:id", verifyToken, eq.putEventById);
app.put("/api/v1/task/:id", verifyToken, tq.putTaskById);

// update friend request by receiver
app.put(
  "/api/v1/friend-request/sender/:send_id/receiver/:receive_id",
  verifyToken,
  fq.putRequestByIds
);

// delete item by id
app.delete("/api/v1/user/:id", verifyToken, uq.deleteUserById);
app.delete("/api/v1/event/:id", verifyToken, eq.deleteEventById);
app.delete("/api/v1/task/:id", verifyToken, tq.deleteTaskById);
app.delete(
  "/api/v1/friend-request/sender/:send_id/receiver/:receive_id",
  verifyToken,
  fq.deleteFriendByIds
);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
