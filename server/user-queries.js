import { pool } from "./server.js";
import jwt from "jsonwebtoken";

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
    });
  };
  
  export const getUserByNamePass = async (request, response) => {
    const sql =
      'SELECT id, username FROM public."Users" WHERE username = $1 AND password = $2';
    const values = [request.params.username, request.params.password];
    const res = await pool.query(sql, values, (error, results) => {
      if (error) {
        throw error;
      }

      if (!results.rows) {
        console.log(results)
        return response.status(400).send("Invalid username or password")
      }
      // eslint-disable-next-line no-undef
      const token = jwt.sign({userId: results.id}, process.env.Secret)
      results.rows.push({token: token})
      response.status(200).json(results.rows);
    });
  };
  
  export const getUserByName = async (request, response) => {
    const sql =
      'SELECT username FROM public."Users" WHERE username = $1';
    const values = [request.params.username];
    console.log(request.params.username)
    await pool.query(sql, values, (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rows);
    });
  };

  export const deleteUserById = async (request, response) => {
    const sql = 'UPDATE public."Users" SET disabled = true WHERE id = $1;';
    const values = [request.params.id];
    console.log(request.params.id)
  
    await pool.query(sql, values, (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.rows)
      response.status(200).json(results.rows);
    });
  };
  