import { pool } from "./server.js";

// event queries
export const getAllEvents = async (request, response) => {
  const res = await pool.query(
    'SELECT e.id, e.name, e.date_from, e.date_to, e.calendar_id, c.name AS calendar_name FROM public."Events" AS e, public."Calendars" AS c WHERE c.id = e.calendar_id ORDER BY e.date_from',
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

// task queries
export const getAllTasks = async (request, response) => {
  const res = await pool.query(
    'SELECT t.id, t.calendar_id, c.name AS calendar_name, t.name, t.date_due, t.event_id, e.name AS event_name, cr.description AS completion_rate_name FROM public."Tasks" AS t, public."Completion_rates" AS cr, public."Calendars" AS c, public."Events" AS e WHERE c.id = t.calendar_id AND t.event_id = e.id AND t.completion_rate_id = cr.id ORDER BY t.date_due',
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

// user queries
export const getAllUsers = async (request, response) => {
  const sql =
    'SELECT username, id FROM public."Users" WHERE NOT EXISTS ' +
    '(SELECT * FROM public."Friend_requests" AS fr WHERE (fr.receive_user_id = $1 AND id = fr.send_user_id) OR (fr.send_user_id = $1 AND id = fr.receive_user_id))' +
    ' AND NOT EXISTS (SELECT * FROM public."Friends" AS f WHERE (f.user2_id = $1 AND f.user1_id = id) OR (f.user1_id = $1 AND f.user2_id = id))' +
    " AND id != $1";
  const values = ["3ab413ce-21ad-4868-9f11-c7b24e041b47"];

  const res = await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
    console.log(res);
  });
};

export const postUser = async (request, response) => {
  const sql =
    'INSERT INTO public."Users" (id, username, salt, password, disabled) VALUES ($1, $2, $3, $4, $5) RETURNING id, username';
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

    request.session.save(() => {
      request.session.logged_in = true;
      request.session.user = {
        id: results.id,
        username: results.username,
      };
    });

    response.status(200).json(results.rows);

    console.log("session: ", response.session);
    console.log("reSPOnSeeeeeeee", results);
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

// friends queries
export const getAllFriends = async (request, response) => {
  const sql =
    'SELECT u.username, u.id FROM public."Friends" AS f, public."Users" AS u WHERE f.user2_id = $1 AND f.user1_id = u.id UNION SELECT u.username, u.id FROM public."Friends" AS f, public."Users" AS u WHERE f.user1_id = $1 AND f.user2_id = u.id';
  const values = ["3ab413ce-21ad-4868-9f11-c7b24e041b47"];
  const res = await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
    console.log(res);
  });
};

// friend requests queries
export const getAllPendingFriendRequests = async (request, response) => {
  const sql =
    'SELECT u.id, u.username FROM public."Friend_requests" AS fr, public."Users" AS u WHERE fr.receive_user_id = $1 AND fr.accepted = false AND u.id = fr.send_user_id';
  const values = ["3ab413ce-21ad-4868-9f11-c7b24e041b47"];
  const res = await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
    console.log(res);
  });
};

export const getAllSentFriendRequests = async (request, response) => {
  const sql =
    'SELECT u.id, u.username FROM public."Friend_requests" AS fr, public."Users" AS u WHERE fr.send_user_id = $1 AND fr.accepted = false AND u.id = fr.receive_user_id';
  const values = ["3ab413ce-21ad-4868-9f11-c7b24e041b47"];
  const res = await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
    console.log(res);
  });
};

export const deleteFriendByIds = async (request, response) => {
  const sql =
    'DELETE FROM public."Friends" WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)';
  const values = [request.params.send_id, request.params.receive_id];

  await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const putRequestByIds = async (request, response) => {
  let allResults = [];
  const sql =
    'UPDATE public."Friend_requests" SET accepted = true WHERE send_user_id = $1 AND receive_user_id = $2';
  const values = [request.params.send_id, request.params.receive_id];

  await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    allResults = results.rows;
    // response.status(200).json(results.rows);
  });

  const sql2 =
    'INSERT INTO public."Friends" (user1_id, user2_id) VALUES ($1, $2)';

  await pool.query(sql2, values, (error, results) => {
    if (error) {
      throw error;
    }
    allResults.push(results.rows);
    // response.status(200).json(results.rows);
  });

  response.status(200).json(allResults);
};

export const postFriendRequest = async (request, response) => {
  const sql =
    'INSERT INTO public."Friend_requests" (send_user_id, receive_user_id, accepted, date_created) VALUES ($1, $2, $3, $4)';
  const values = [
    request.body.sender_id,
    request.body.receiver_id,
    false,
    request.body.date,
  ];

  await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// calendar queries
export const getAllEventsByCalId = async (request, response) => {
  const sql =
    'SELECT e.date_from, e.date_to, e.id, e.color, e.name FROM public."Events" AS e, public."Calendar_permissions" AS cp WHERE e.calendar_id = cp.calendar_id AND cp.calendar_id = $2 AND cp.user_id = $1';
  const values = ["3ab413ce-21ad-4868-9f11-c7b24e041b47", request.params.calendar_id];
  const res = await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
    console.log(res);
  });
};

export const getAllOwnedCalendars = async (request, response) => {
  const sql =
    'SELECT calendar_id, name FROM public."Calendar_permissions" AS cp, public."Calendars" AS c WHERE c.id = cp.calendar_id AND cp.user_id = $1 AND cp.owner = true';
  const values = ["3ab413ce-21ad-4868-9f11-c7b24e041b47"];
  const res = await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
    console.log(res);
  });
};

export const getAllSharedCalendars = async (request, response) => {
  const sql =
    'SELECT calendar_id, name FROM public."Calendar_permissions" AS cp, public."Calendars" AS c WHERE c.id = cp.calendar_id AND cp.user_id = $1 AND cp.owner = false';
  const values = ["3ab413ce-21ad-4868-9f11-c7b24e041b47"];
  const res = await pool.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
    console.log(res);
  });
};