import Programmation from "../models/Programmation";
import Programs from "../models/Programs";
import { Request, Response } from "express";

export const getAllProgrammation = async (req: Request, res: Response) => {
   await Programmation.find({})
      .populate("semana_Programas", "")
      .then(function (programs) {
         res.status(200).send(programs);
      });
};

export const getLatestProgrammation = async (req: Request, res: Response) => {
   await Programmation.findOne()
      .sort({ _id: -1 })
      .limit(1)
      .populate("semana_Programas", "")
      .then(function (programs) {
         res.status(200).send(programs);
      });
};

export const getProgrammationById = async (req: Request, res: Response) => {
   const { programId } = req.params;
   await Programmation.findOne({ _id: programId })
      .populate("semana_Programas", "")
      .then(function (programs) {
         res.status(200).send(programs);
      });
};

export const createNewProgrammation = async (req: Request, res: Response) => {
   console.log(req.body);

   await Programmation.create(req.body, function (err, creado) {
      if (err) res.status(500).send("Something went wrong");
      res.status(200).send("Programmation created successfully");
   });
};

export const deleteProgrammationById = async (req: Request, res: Response) => {
   const { programationId } = req.params;

   const programmation = await Programmation.findOneAndDelete({ _id: programationId });
   if (!programmation) return res.status(500).send("Programmation not found");
   const programsId = programmation.semana_Programas;

   for (let i = 0; i < programsId.length; i++) {
      await Programs.findByIdAndDelete({ _id: programsId[i]._id });
   }

   return res.status(200).send("Programmation deleted successfully");
};
