import { pool } from "./server.js";


export const getCompletionRates = async (request, response) => {
    const sql =
      'SELECT * FROM public."Completion_rates"';
    await pool.query(sql, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };