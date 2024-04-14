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
