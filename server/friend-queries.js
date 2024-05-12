import { pool } from "./server.js";

// friends queries
export const getAllFriends = async (request, response) => {
    const sql =
      'SELECT u.username, u.id FROM public."Friends" AS f, public."Users" AS u WHERE f.user2_id = $1 AND f.user1_id = u.id UNION SELECT u.username, u.id FROM public."Friends" AS f, public."Users" AS u WHERE f.user1_id = $1 AND f.user2_id = u.id';
    const values = [request.userId];
    const res = await pool.query(sql, values, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };
  
  // friend requests queries
  export const getAllPendingFriendRequests = async (request, response) => {
    const sql =
      'SELECT u.id, u.username FROM public."Friend_requests" AS fr, public."Users" AS u WHERE fr.receive_user_id = $1 AND fr.accepted = false AND u.id = fr.send_user_id';
    const values = [request.userId];
    const res = await pool.query(sql, values, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };
  
  export const getAllSentFriendRequests = async (request, response) => {
    const sql =
      'SELECT u.id, u.username FROM public."Friend_requests" AS fr, public."Users" AS u WHERE fr.send_user_id = $1 AND fr.accepted = false AND u.id = fr.receive_user_id';
    const values = [request.userId];
    const res = await pool.query(sql, values, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
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
  