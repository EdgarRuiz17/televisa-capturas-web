import Programmation from "../models/Programmation";
import Programs from "../models/Programs";
import { Response, Request } from "express";
import UserLogs from "../models/UserLogs";
import Users from "../models/Users";

export const addNewProgram = async (req: Request, res: Response) => {
   const { programationId } = req.params;
   console.log(req.body);
   Programs.create(req.body, function (err, program) {
      if (err) res.status(400).send("Program not created");
      console.log(program._id);
      Programmation.findOneAndUpdate(
         { _id: programationId },
         { $push: { semana_Programas: program._id } },
         { new: true },
         function (err, programationUpdated) {
            if (err) res.status(400).send("Programmation not found");
            Programs.findOneAndUpdate(
               { _id: program._id },
               { $set: { programmation: programationId } },
               function (err, programUpdated) {
                  if (err) res.status(400).send("Programmation id has not been updated");
                  res.status(202).send(programUpdated);
               }
            );
         }
      );
   });
};

export const updateProgramStatusById = async (req: any, res: Response) => {
   const { programId } = req.params;
   const { programa_Estatus } = req.body;

   console.log(programa_Estatus);

   const UserFound = await Users.findOne({ _id: req.decoded.user_data._id });
   if (!UserFound) return res.status(400).send("User not found");

   const Program = await Programs.findOne({ _id: programId });
   if (!Program) return res.status(400).send("Program not found");

   const userLog = {};
   console.log(Program.programa_Estatus);
   if (Program.programa_Estatus.Calificado !== programa_Estatus.Calificado) {
      userLog["logs_calificado"] = {
         nombre_Usuario: UserFound.nombre_Usuario,
         fecha_modificado: new Date(),
      };
   }
   if (Program.programa_Estatus.Master !== programa_Estatus.Master) {
      userLog["logs_master"] = {
         nombre_Usuario: UserFound.nombre_Usuario,
         fecha_modificado: new Date(),
      };
   }
   if (Program.programa_Estatus.Referencia !== programa_Estatus.Referencia) {
      userLog["logs_referencia"] = {
         nombre_Usuario: UserFound.nombre_Usuario,
         fecha_modificado: new Date(),
      };
   }
   console.log("AAAAAA", userLog);
   if (Program.userLogs) {
      await UserLogs.findOneAndUpdate(
         { _id: Program.userLogs },
         {
            $set: userLog,
         }
      );
   } else {
      const createdLog = await UserLogs.create(userLog);
      await Program.updateOne({ userLogs: createdLog._id });
   }

   const update = await Programs.findOneAndUpdate({ _id: programId }, req.body, { new: true });
   if (!update) return res.status(400).send("Not updated");
   return res.status(202).send("Updated");
};

export const updateProgramById = async (req: Request, res: Response) => {
   const { programId } = req.params;
   console.log(req.body);
   const update = await Programs.findOneAndUpdate({ _id: programId }, req.body, { new: true });
   if (!update) return res.status(500).send("Not updated");
   return res.status(202).send("Updated");
};

export const deleteProgramById = (req: Request, res: Response) => {
   const { programId } = req.params;

   Programs.findByIdAndDelete({ _id: programId }, function (err, deleted) {
      if (err) return res.status(202).send("Program not found");
   });

   return res.status(200).send("Program deleted successfully");
};
