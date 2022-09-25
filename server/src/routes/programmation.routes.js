import express from "express";
const router = express.Router();
import {
   getLatestProgrammation,
   getAllProgrammation,
   createNewProgrammation,
   deleteProgrammationById,
} from "../controllers/programmationController";
import validar from "../middlewares/userExtractor";

router
   .get("/latest", getLatestProgrammation)
   .get("/list", getAllProgrammation)
   .post("/add", validar, createNewProgrammation)
   .delete("/delete/:programationId", validar, deleteProgrammationById);

export default router;
