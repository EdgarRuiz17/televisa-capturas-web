import { Schema, model } from "mongoose";

interface Programs {
   programa_Dia: number;
   programa_Nombre: string;
   programa_Subnombre: string;
   programa_Tipo: string;
   programa_Calidad: string;
   hora_Inicio: Date;
   hora_Fin: Date;
   programmation: Schema.Types.ObjectId;
   programa_Estatus: Estatus;
   programa_Referencia: string;
   userLogs: Schema.Types.ObjectId;
}

interface Estatus {
   Calificado: boolean;
   Referencia: boolean;
   Master: boolean;
}

const programsSchema = new Schema({
   programa_Dia: {
      type: Number,
      required: false,
   },
   programa_Nombre: {
      type: String,
      required: true,
      trim: true,
   },
   programa_Subnombre: {
      type: String,
      required: false,
      trim: true,
   },
   programa_Tipo: {
      type: String,
      required: true,
      trim: true,
   },
   programa_Calidad: {
      type: String,
      required: true,
      trim: true,
   },
   hora_Inicio: {
      type: Date,
      required: true,
   },
   hora_Fin: {
      type: Date,
      required: true,
   },
   programmation: {
      type: Schema.Types.ObjectId,
      ref: "Programmations",
   },
   programa_Estatus: {
      Calificado: {
         type: Boolean,
         required: true,
         default: false,
      },
      Referencia: {
         type: Boolean,
         required: true,
         default: false,
      },
      Master: {
         type: Boolean,
         required: true,
         default: false,
      },
   },
   programa_Referencia: {
      type: String,
      required: false,
   },
   userLogs: {
      type: Schema.Types.ObjectId,
      ref: "UserLogs",
   },
});

export default model<Programs>("Programs", programsSchema);
