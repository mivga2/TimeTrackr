import { pool } from "./server.js";

export const getAllEvents = async (request, response) => {
  const res = await pool.query(
    'SELECT * FROM public."Events"',
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
      console.log(res);
    }
  );
};

export const postEvent = async (request, response) => {
  const sql = 'INSERT INTO public."Events" (id, calendar_id, name, description, date_from, date_to, repetition_type_id, custom_repetition_dates, location, event_category_id, color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)'
  const values = [request.body.id, request.body.calendar_id, request.body.name, request.body.description, request.body.date_from, request.body.date_to, request.body.repetition_type_id, request.body.custom_repetition_dates, request.body.location, request.body.event_category_id, request.body.color]
 
  await pool.query(sql, values, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};


export const getAllTasks = async (request, response) => {
  const res = await pool.query(
    'SELECT * FROM public."Tasks"',
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
      console.log(res);
    }
  );
};

export const postTask = async (request, response) => {
  const sql = 'INSERT INTO public."Tasks" (id, calendar_id, name, color, visible, description, date_due, repetition_type_id, custom_repetition_dates, completion_rate_id, task_category_id, event_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)'
  const values = [request.body.id, request.body.calendar_id, request.body.name, request.body.color, request.body.visible, request.body.description, request.body.date_due, request.body.repetition_type_id, request.body.custom_repetition_dates, request.body.completion_rate_id, request.body.task_category_id, request.body.event_id]

  await pool.query(sql, values, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

export const getEventById = async (request, response) => {
  const res = await pool.query(
    'SELECT * FROM public."Events"',
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
      console.log(res);
    }
  );
};
