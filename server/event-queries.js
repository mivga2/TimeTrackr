import { pool } from "./server.js";

// event queries
export const getAllEvents = async (request, response) => {
  const sql =
    'SELECT e.id, e.name, e.date_from, e.date_to, e.calendar_id, c.name AS calendar_name FROM public."Events" AS e, public."Calendars" AS c, public."Calendar_permissions" AS cp WHERE c.id = e.calendar_id AND cp.calendar_id = c.id AND cp.user_id = $1 AND cp.owner = true ORDER BY e.date_from';
  const values = [request.userId];
  const res = await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const postEvent = async (request, response) => {
  const sql =
    'INSERT INTO public."Events" (id, calendar_id, name, description, date_from, date_to, repetition_type_id, custom_repetition_dates, location, event_category_id, color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
  const values = [
    request.body.id,
    request.body.calendar_id,
    request.body.name,
    request.body.description,
    request.body.date_from,
    request.body.date_to,
    request.body.repetition_type_id,
    request.body.custom_repetition_dates,
    request.body.location,
    request.body.event_category_id,
    request.body.color,
  ];

  await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const getEventById = async (request, response) => {
  const sql = 'SELECT * FROM public."Events" WHERE id = $1';
  const values = [request.params.id];

  const res = await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const putEventById = async (request, response) => {
  const sql =
    'UPDATE public."Events" SET calendar_id = $1, name = $2, description = $3, date_from = $4, date_to = $5, repetition_type_id = $6, custom_repetition_dates = $7, location = $8, event_category_id = $9, color = $10 WHERE id = $11';

  const values = [
    request.body.calendar_id,
    request.body.name,
    request.body.description,
    request.body.date_from,
    request.body.date_to,
    request.body.repetition_type_id,
    request.body.custom_repetition_dates,
    request.body.location,
    request.body.event_category_id,
    request.body.color,
    request.body.id,
  ];

  await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const deleteEventById = async (request, response) => {
  const sql = 'DELETE FROM public."Events" WHERE id = $1;';
  const values = [request.params.id];

  await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
