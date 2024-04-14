import axios from "axios";
// import { useState } from 'react';
const apiUrlBase = "http://localhost:3000";

export const fetchAll = async (apiUrl: string) => {
  const apiEndpoint = `${apiUrlBase}${apiUrl}`;

  const response = await axios.get(apiEndpoint).catch((error) => {
    console.error("Couldn't load data.", error);
  });

  return response;
};
