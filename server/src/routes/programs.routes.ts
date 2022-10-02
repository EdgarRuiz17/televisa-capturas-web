import { Router } from "express";
import {
   addNewProgram,
   updateProgramStatusById,
   updateProgramById,
   deleteProgramById,
} from "../controllers/programsController";
const router = Router();

router
   .post("/add/:programationId", addNewProgram)
   .put("/update/status/:programId", updateProgramStatusById)
   .put("/update/:programId", updateProgramById)
   .delete("/delete/:programId", deleteProgramById);

export default router;
