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
      const sql =
        'SELECT * FROM public."Events" WHERE calendar_id = $1';
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

  
  export const postCalendarPermission = async (request, response) => {
    const sql =
      'INSERT INTO public."Calendar_permissions" (calendar_id, user_id, owner, read) VALUES ($1, $2, $3, $4)';
    const values = [
      request.params.calendar_id,
      request.body.id,
      false,
      true,
    ];
  
    await pool.query(sql, values, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };