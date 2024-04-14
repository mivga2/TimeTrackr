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

export const postNew = async (apiUrl: string, data: any) => {
  const apiEndpoint = `${apiUrlBase}${apiUrl}`;

  await axios
    .post(apiEndpoint, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
