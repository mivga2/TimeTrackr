import { pool } from "./server.js";

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
  