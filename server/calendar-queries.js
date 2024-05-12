import { pool } from "./server.js";

// calendar queries
export const getAllEventsByCalIdUserId = async (request, response) => {
  const sql =
    'SELECT e.date_from, e.date_to, e.id, e.color, e.name FROM public."Events" AS e, public."Calendar_permissions" AS cp WHERE e.calendar_id = cp.calendar_id AND cp.calendar_id = $2 AND cp.user_id = $1';
  const values = [request.userId, request.params.calendar_id];
  const res = await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const getAllEventsByCalId = async (request, response) => {
  const sql = 'SELECT * FROM public."Events" WHERE calendar_id = $1';
  const values = [request.params.calendar_id];
  const res = await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const getAllOwnedCalendars = async (request, response) => {
  const sql =
    'SELECT calendar_id, name FROM public."Calendar_permissions" AS cp, public."Calendars" AS c WHERE c.id = cp.calendar_id AND cp.user_id = $1 AND cp.owner = true';
  const values = [request.userId];
  const res = await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const getAllSharedCalendars = async (request, response) => {
  const sql =
    'SELECT calendar_id, name FROM public."Calendar_permissions" AS cp, public."Calendars" AS c WHERE c.id = cp.calendar_id AND cp.user_id = $1 AND cp.owner = false';
  const values = [request.userId];
  const res = await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const postCalendar = async (request, response) => {
  const sql1 = 'INSERT INTO public."Calendars" (id, name) VALUES ($1, $2)';
  const values1 = [request.body.id, request.body.name];

  console.log(request.body, " bod ", request.userId)
  await pool.query(sql1, values1, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results.rows)
  })

  response.status(200).send("New calnedar has been created");
};

export const postOwnerCalendarPermission = async (request, response) => {
  const sql2 =
    'INSERT INTO public."Calendar_permissions" (calendar_id, user_id, owner, read) VALUES ($1, $2, $3, $4)';
  const values2 = [request.body.id, request.userId, true, true];

    await pool.query(sql2, values2, (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.rows)
    });

  response.status(200).send("Calnedar permissions have been added");
};

export const postCalendarPermission = async (request, response) => {
  const sql =
    'INSERT INTO public."Calendar_permissions" (calendar_id, user_id, owner, read) VALUES ($1, $2, $3, $4)';
  const values = [request.params.calendar_id, request.body.id, false, true];

  await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
