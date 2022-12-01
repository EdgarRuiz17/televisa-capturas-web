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

// Users calls

export const getAllUsers = async (token: string) => {
   const headers = {
      headers: {
         Authorization: token,
      },
   };
   return await axios.get(`${LOCALROUTE}${USERS}/`, headers);
};

export const deleteUserById = async (token: string, id: string) => {
   const headers = {
      headers: {
         Authorization: token,
      },
   };
   return await axios.delete(`${LOCALROUTE}${USERS}${DELETE}/${id}`, headers);
};

export const createNewUser = async (
   token: string,
   nombre_Usuario: string,
   contrasena_Usuario: string,
   tipo_Usuario: any
) => {
   const payload = {
      nombre_Usuario,
      contrasena_Usuario,
      tipo_Usuario,
   };
   const headers = {
      headers: {
         Authorization: token,
      },
   };
   return await axios.post(`${LOCALROUTE}${USERS}${ADD}`, payload, headers);
};

export const modifyUserById = async (
   token: string,
   nombre_Usuario: string,
   contrasena_Usuario: string,
   tipo_Usuario: any,
   id: string
) => {
   const payload = {
      nombre_Usuario,
      contrasena_Usuario,
      tipo_Usuario,
   };
   const headers = {
      headers: {
         Authorization: token,
      },
   };
   return await axios.put(`${LOCALROUTE}${USERS}${UPDATE}/${id}`, payload, headers);
};

//Programmation calls

export const createNewProgrammation = async (token: string, data: object) => {
   const headers = {
      headers: {
         Authorization: token,
      },
   };
   return await axios.post(`${LOCALROUTE}${PROGRAMMATIONS}${ADD}`, data, headers);
};

export const getAllProgrammations = async (token: string) => {
   const headers = {
      headers: {
         Authorization: token,
      },
   };
   return await axios.get(`${LOCALROUTE}${PROGRAMMATIONS}${LIST}`, headers);
};

export const getLatestProgrammation = async () => {
   return await axios.get(`${LOCALROUTE}${PROGRAMMATIONS}${LATEST}`);
};

export const getProgrammationById = async (token: string, id: string) => {
   const headers = {
      headers: {
         Authorization: token,
      },
   };
   return await axios.get(`${LOCALROUTE}${PROGRAMMATIONS}/programs/${id}`, headers);
};

export const deleteProgrammationById = async (token: string, programmation_Id: string) => {
   const headers = {
      headers: {
         Authorization: token,
      },
   };
   return await axios.delete(`${LOCALROUTE}${PROGRAMMATIONS}/delete/${programmation_Id}`, headers);
};

export const modifyProgrammationById = async (
   token: string,
   programmation_Id: string,
   semana_Inicio: string,
   semana_Fin: string
) => {
   const headers = {
      headers: {
         Authorization: token,
      },
   };
   const payload = {
      semana_Fin,
      semana_Inicio,
   };
   return await axios.put(`${LOCALROUTE}${PROGRAMMATIONS}/${programmation_Id}`, payload, headers);
};

// Programs Calls

export const createNewProgram = async (
   token: string,
   data: object,
   id_programation: string
   // id_programacion: string,
   // programa_Nombre: string,
   // programa_Tipo: string,
   // programa_Calidad: string,
   // hora_Inicio: Date,
   // hora_Fin: Date
) => {
   // console.log(hora_Inicio);
   // const payload = {
   //    programa_Nombre,
   //    programa_Tipo,
   //    programa_Calidad,
   //    hora_Inicio,
   //    hora_Fin,
   // };
   const headers = {
      headers: {
         Authorization: token,
      },
   };
   return await axios.post(`${LOCALROUTE}${PROGRAMS}/add/${id_programation}`, data, headers);
};

export const deleteProgram = async (token: string, idToDelete: string) => {
   const headers = {
      headers: {
         Authorization: token,
      },
   };
   return await axios.delete(`${LOCALROUTE}${PROGRAMS}/delete/${idToDelete}`, headers);
};

export const modifyProgram = async (
   token: string,
   idToModify: string,
   programa_Nombre: string,
   programa_Subnombre: string,
   programa_Tipo: string,
   programa_Calidad: string,
   hora_Inicio: Date,
   hora_Fin: Date
) => {
   const payload = {
      programa_Nombre,
      programa_Subnombre,
      programa_Tipo,
      programa_Calidad,
      hora_Inicio,
      hora_Fin,
   };
   const headers = {
      headers: {
         Authorization: token,
      },
   };
   return await axios.put(`${LOCALROUTE}${PROGRAMS}/update/${idToModify}`, payload, headers);
};
