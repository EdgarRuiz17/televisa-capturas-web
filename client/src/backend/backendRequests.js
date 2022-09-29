import axios from "axios";

//LocalRoute
const LOCALROUTE = "http://localhost:9000";

const USERS = "/users";
const PROGRAMMATIONS = "/programmations";
const PROGRAMS = "/programs";
const ADD = "/add";
const UPDATE = "/update";
const DELETE = "/delete";
const LIST = "/list";
const LATEST = "/latest"

export const getAllProgrammations = async () => {
   return await axios.get(`${LOCALROUTE}${PROGRAMMATIONS}${LIST}`);
};

export const getLatestProgrammation = async () => {
   return await axios.get(`${LOCALROUTE}${PROGRAMMATIONS}${LATEST}`);
};
