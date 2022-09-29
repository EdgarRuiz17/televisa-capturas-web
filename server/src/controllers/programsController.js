import Programmation from "../models/Programmation";
import Programs from "../models/Programs";

export const addNewProgram = async (req, res) => {
   const { programationId } = req.params;
   Programs.create(req.body, function (err, program) {
      if (err) res.status(500).send("Program not created");
      console.log(program._id);
      Programmation.findOneAndUpdate(
         { _id: programationId },
         { $push: { semana_Programas: program._id } },
         { new: true },
         function (err, programationUpdated) {
            if (err) res.status(500).send("Programmation not found");
            Programs.findOneAndUpdate(
               { _id: program._id },
               { $set: { programmation: programationId } },
               function (err, programUpdated) {
                  if (err) res.status(500).send("Programmation id has not been updated");
                  res.status(202).send(programUpdated);
               }
            );
         }
      );
   });
};

export const updateProgramStatusById = async (req, res) => {
   const { programId } = req.params;

   await Programs.findOneAndUpdate({ _id: programId }, {$pull: {status: req.body}}, { new: true }, function (err, programUpdated) {
      if (err) res.status(500).send(programUpdated);
   });
};

export const updateProgramById = async (req, res) => {
   const { programId } = req.params;

   await Programs.findOneAndUpdate({ _id: programId }, req.body, { new: true }, function (err, programUpdated) {
      if (err) res.status(500).send(programUpdated);
   });
};

export const deleteProgramById = (req, res) => {
   const { programId } = req.params;

    Programs.findByIdAndDelete({ _id: programId }, function (err, deleted) {
      if (err) return res.status(202).send("Program not found");
   });

   return res.status(200).send("Program deleted successfully");
};
