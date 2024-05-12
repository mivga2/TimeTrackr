import axios from "axios";
// import { useState } from 'react';
const apiUrlBase = "https://timetrackrserver.onrender.com";
// const apiUrlBase = "http://localhost:3000";

export const fetchAll = async (apiUrl: string) => {
  const apiEndpoint = `${apiUrlBase}${apiUrl}`;

  const response = await axios
    .get(apiEndpoint, {
      headers: {
        authorization: localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      console.error("Couldn't load data.", error);
    });

  return response;
};

export const fetchAllUserdata = async (apiUrl: string) => {
  const apiEndpoint = `${apiUrlBase}${apiUrl}`;

  const response = await axios
    .get(apiEndpoint, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      console.error("Couldn't load data.", error);
    });

  return response;
};

export const fetchOne = async (apiUrl: string) => {
  const apiEndpoint = `${apiUrlBase}${apiUrl}`;
  const response = await axios
    .get(apiEndpoint, {
      headers: {
        authorization: localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      console.error("Couldn't load data.", error);
    });

  return response;
};

export const getUserAuthenticate = async (apiUrl: string) => {
  const apiEndpoint = `${apiUrlBase}${apiUrl}`;

  const response = await axios.get(apiEndpoint).catch((error) => {
    console.error("Couldn't load data.", error);
  });

  return response;
};

export const postNew = async (apiUrl: string, data: any) => {
  const apiEndpoint = `${apiUrlBase}${apiUrl}`;

  const response = await axios
    .post(apiEndpoint, data, {
      headers: {
        authorization: localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      console.log(error);
    });

  return response;
};

export const postNewUser = async (apiUrl: string, data: any) => {
  const apiEndpoint = `${apiUrlBase}${apiUrl}`;

  const response = await axios
    .post(apiEndpoint, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      console.log(error);
    });

  return response;
};

export const deleteOne = async (apiUrl: string) => {
  const apiEndpoint = `${apiUrlBase}${apiUrl}`;

  await axios
    .delete(apiEndpoint, {
      headers: {
        authorization: localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      console.error("Couldn't load data.", error);
    });
};

export const updateOne = async (apiUrl: string, data: any) => {
  const apiEndpoint = `${apiUrlBase}${apiUrl}`;

  await axios
    .put(apiEndpoint, data, {
      headers: {
        authorization: localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .catch(function (error) {
      console.log(error);
    });
};
