import { Router } from "express";
import verify from "../middlewares/userExtractor";
import {
   addNewProgram,
   updateProgramStatusById,
   updateProgramById,
   deleteProgramById,
} from "../controllers/programsController";
const router = Router();

router
   .post("/add/:programationId", addNewProgram)
   .put("/update/status/:programId", verify, updateProgramStatusById)
   .put("/update/:programId", updateProgramById)
   .delete("/delete/:programId", deleteProgramById);

export default router;
