import { pool } from "./server.js";

// task queries
export const getAllTasks = async (request, response) => {
  const sql =
    'SELECT t.id, t.calendar_id, c.name AS calendar_name, t.name, t.date_due, t.event_id, e.name AS event_name, cr.description AS completion_rate_name FROM public."Tasks" AS t, public."Completion_rates" AS cr, public."Calendars" AS c, public."Events" AS e, public."Calendar_permissions" AS cp WHERE cp.calendar_id = c.id AND cp.user_id = $1 AND c.id = t.calendar_id AND t.event_id = e.id AND t.completion_rate_id = cr.id AND cp.owner = true ORDER BY t.date_due';
  const values = [request.userId];

  const res = await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const postTask = async (request, response) => {
  const sql =
    'INSERT INTO public."Tasks" (id, calendar_id, name, color, visible, description, date_due, repetition_type_id, custom_repetition_dates, completion_rate_id, task_category_id, event_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
  const values = [
    request.body.id,
    request.body.calendar_id,
    request.body.name,
    request.body.color,
    request.body.visible,
    request.body.description,
    request.body.date_due,
    request.body.repetition_type_id,
    request.body.custom_repetition_dates,
    request.body.completion_rate_id,
    request.body.task_category_id,
    request.body.event_id,
  ];

  await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const getTaskById = async (request, response) => {
  const sql = 'SELECT * FROM public."Tasks" WHERE id = $1';
  const values = [request.params.id];

  const res = await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const putTaskById = async (request, response) => {
  const sql =
    'UPDATE public."Tasks" SET calendar_id = $1, name = $2, color = $3, visible = $4, description = $5, date_due = $6, repetition_type_id = $7, custom_repetition_dates = $8, completion_rate_id = $9, task_category_id = $10, event_id = $11 WHERE id = $12';

  const values = [
    request.body.calendar_id,
    request.body.name,
    request.body.color,
    request.body.visible,
    request.body.description,
    request.body.date_due,
    request.body.repetition_type_id,
    request.body.custom_repetition_dates,
    request.body.completion_rate_id,
    request.body.task_category_id,
    request.body.event_id,
    request.body.id,
  ];

  await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const deleteTaskById = async (request, response) => {
  const sql = 'DELETE FROM public."Tasks" WHERE id = $1;';
  const values = [request.params.id];

  await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
