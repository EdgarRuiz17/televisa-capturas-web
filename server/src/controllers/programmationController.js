import Programmation from "../models/Programmation";
import Programs from "../models/Programs";

export const getAllProgrammation = async (req, res) => {
   await Programmation.find({})
      .populate("semana_Programas", "")
      .then(function (programs) {
         res.status(200).send(programs);
      });
};

export const getLatestProgrammation = async (req, res) => {
   await Programmation.findOne()
      .sort({ _id: -1 })
      .limit(1)
      .populate("semana_Programas", "")
      .then(function (err, programs) {
         if (err) res.status(500).send(err);
         res.status(200).send(programs);
      });
};

export const createNewProgrammation = async (req, res) => {
   console.log(req.body);

   await Programmation.create(req.body, function (err, creado) {
      if (err) res.status(500).send("Something went wrong");
      res.status(200).send("Programmation created successfully");
   });
};

export const deleteProgrammationById = async (req, res) => {
   const { programationId } = req.params;

   const programmation = await Programmation.findOneAndDelete({ _id: programationId });
   const programsId = programmation.semana_Programas;

   for (let i = 0; i < programsId.length; i++) {
      await Programs.findByIdAndDelete({ _id: programsId[i]._id });
   }

   return res.status(200).send("Programmation deleted successfully");
};
