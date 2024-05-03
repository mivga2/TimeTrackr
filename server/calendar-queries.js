import { pool } from "./server.js";

// calendar queries
export const getAllEventsByCalIdUserId = async (request, response) => {
    const sql =
      'SELECT e.date_from, e.date_to, e.id, e.color, e.name FROM public."Events" AS e, public."Calendar_permissions" AS cp WHERE e.calendar_id = cp.calendar_id AND cp.calendar_id = $2 AND cp.user_id = $1';
    const values = ["3ab413ce-21ad-4868-9f11-c7b24e041b47", request.params.calendar_id];
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
    const values = ["3ab413ce-21ad-4868-9f11-c7b24e041b47"];
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
    const values = ["3ab413ce-21ad-4868-9f11-c7b24e041b47"];
    const res = await pool.query(sql, values, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };