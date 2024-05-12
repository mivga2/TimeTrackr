import { generateToken } from "./auth.js";
import { pool } from "./server.js";
import bcrypt from "bcrypt";
const saltRounds = 10

// user queries
export const getAllUsers = async (request, response) => {
    const sql =
      'SELECT username, id FROM public."Users" WHERE NOT EXISTS ' +
      '(SELECT * FROM public."Friend_requests" AS fr WHERE (fr.receive_user_id = $1 AND id = fr.send_user_id) OR (fr.send_user_id = $1 AND id = fr.receive_user_id))' +
      ' AND NOT EXISTS (SELECT * FROM public."Friends" AS f WHERE (f.user2_id = $1 AND f.user1_id = id) OR (f.user1_id = $1 AND f.user2_id = id))' +
      " AND id != $1";
    const values = [request.userId];

    const res = await pool.query(sql, values, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };
  
  export const postUser = async (request, response) => {
    let hashSalt = '';
    const hashedPassword = await bcrypt.genSalt(saltRounds).then(salt => {
      hashSalt = salt
      return bcrypt.hash(request.body.password, salt)
    }).catch(() => {
      response.status(500).send("Couldn't create user.")
    })
    console.log("hash ", hashedPassword, " raw ", request.body.password, " cmp ", await bcrypt.compare(request.body.password, hashedPassword))
    const sql =
      'INSERT INTO public."Users" (id, username, password, disabled, salt) VALUES ($1, $2, $3, $4, $5) RETURNING id, username';
    const values = [
      request.body.id,
      request.body.username,
      hashedPassword,
      request.body.disabled,
      hashSalt
    ];
  
    await pool.query(sql, values, (error, results) => {
      if (error) {
        response.status(500).send("Couldn't create user.");
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
    let savedPassword = '';

    const sql =
      'SELECT id, username, password, salt FROM public."Users" WHERE username = $1 AND disabled = false';
    const values = [request.params.username];
    await pool.query(sql, values, async (error, results) => {
      if (error) {
        return response.status(500).send(error);
      }
      
      if (results.rows.length !== 1) {
        return response.status(400).send("Invalid username or password")
      }

      savedPassword = results.rows[0].password
      const hashPassword = await bcrypt.hash(request.params.password, results.rows[0].salt)
      const passwordMatch = hashPassword.trim() === savedPassword.trim()

      if (!passwordMatch) return response.status(400).send("Invalid username or password")

      // eslint-disable-next-line no-undef
      const token = generateToken({id:results.rows[0].id})
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
        return response.status(500);
      }

      response.status(200).json(results.rows);
    });
  };

  export const deleteUserById = async (request, response) => {
    const sql = 'UPDATE public."Users" SET disabled = true WHERE id = $1;';
    const values = [request.userId];
  
    await pool.query(sql, values, (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.rows)
      response.status(200).json(results.rows);
    });
  };
  