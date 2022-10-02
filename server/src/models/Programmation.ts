import { Schema, model } from "mongoose";

interface Programmation {
   semana_Inicio: string;
   semana_Fin: string;
   semana_Programas: any;
}

const programationSchema = new Schema({
   semana_Inicio: {
      type: String,
      required: true,
   },
   semana_Fin: {
      type: String,
      required: true,
   },
   semana_Programas: [
      {
         type: Schema.Types.ObjectId,
         ref: "Programs",
      },
   ],
});

export default model<Programmation>("Programmations", programationSchema);
