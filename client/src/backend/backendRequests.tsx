import axios from "axios";

//LocalRoute
const LOCALROUTE = "http://localhost:9000";

const USERS = "/users";
const PROGRAMMATIONS = "/programmations";
const PROGRAMS = "/programs";
const ADD = "/add";
const UPDATE = "/update";
const DELETE = "/delete";
const LOGIN = "/Login";
const LIST = "/list";
const LATEST = "/latest";
const VERIFY = "/verify";

// Auth calls

export const AuthUser = async (email: string, password: string) => {
   const payload = {
      nombre_Usuario: email,
      contrasena_Usuario: password,
   };

   return await axios.post(`${LOCALROUTE}${USERS}${LOGIN}`, payload);
};

export const VerifyAuthUser = async (token: string) => {
   console.log(token);
   const headers = {
      headers: {
         Authorization: token,
      },
   };
   return await axios.get(`${LOCALROUTE}${USERS}${VERIFY}`, headers);
};

//Programmation calls

export const getAllProgrammations = async () => {
   return await axios.get(`${LOCALROUTE}${PROGRAMMATIONS}${LIST}`);
};

export const getLatestProgrammation = async () => {
   return await axios.get(`${LOCALROUTE}${PROGRAMMATIONS}${LATEST}`);
};
