import { Router } from "express";
import {
   getLatestProgrammation,
   getAllProgrammation,
   createNewProgrammation,
   deleteProgrammationById,
   getProgrammationById,
} from "../controllers/programmationController";
import verify from "../middlewares/userExtractor";
const router = Router();

router
   .get("/latest", getLatestProgrammation)
   .get("/programs/:programId", getProgrammationById)
   .get("/list", getAllProgrammation)
   .post("/add", verify, createNewProgrammation)
   .delete("/delete/:programationId", verify, deleteProgrammationById);

export default router;
