import express from "express";
import {
   addNewProgram,
   updateProgramStatusById,
   updateProgramById,
   deleteProgramById,
} from "../controllers/programsController";
const router = express.Router();

router
   .post("/add/:programationId", addNewProgram)
   .put("/update/status/:programId", updateProgramStatusById)
   .put("/update/:programId", updateProgramById)
   .delete("/delete", deleteProgramById);

export default router;
