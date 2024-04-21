import { pool } from "./server.js";

// event queries
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
    console.log(res);
  });
};

export const putEventById = async (request, response) => {
  const sql = 'UPDATE public."Events" SET calendar_id = $1, name = $2, description = $3, date_from = $4, date_to = $5, repetition_type_id = $6, custom_repetition_dates = $7, location = $8, event_category_id = $9, color = $10 WHERE id = $11';

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

// task queries
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
    console.log(res);
  });
};


export const putTaskById = async (request, response) => {
  const sql = 'UPDATE public."Tasks" SET calendar_id = $1, name = $2, color = $3, visible = $4, description = $5, date_due = $6, repetition_type_id = $7, custom_repetition_dates = $8, completion_rate_id = $9, task_category_id = $10, event_id = $11 WHERE id = $12';

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

// user queries
export const postUser = async (request, response) => {
  const sql =
    'INSERT INTO public."Users" (id, username, salt, password, disabled) VALUES ($1, $2, $3, $4, $5)';
  const values = [
    request.body.id,
    request.body.username,
    request.body.salt,
    request.body.password,
    request.body.disabled,
  ];

  await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const getUserById = async (request, response) => {
  const sql = 'SELECT * FROM public."Users" WHERE id = $1';
  const values = [request.params.id];

  const res = await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
    console.log(res);
  });
};

export const getUserByName = async (request, response) => {
  const sql =
    'SELECT id FROM public."Users" WHERE username = $1 AND password = $2';
  const values = [request.params.username, request.params.password];
  const res = await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
    console.log(res);
  });
};

export const deleteUserById = async (request, response) => {
  const sql = 'UPDATE public."Users" SET disabled = true WHERE id = $1;';
  const values = [request.params.id];

  await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
