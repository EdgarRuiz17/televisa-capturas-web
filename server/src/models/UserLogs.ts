import { Schema, model } from "mongoose";

interface UserLogs {
   logs_referencia?: object;
   logs_calificado?: object;
   logs_master?: object;
}

const userLogsSchema = new Schema({
   logs_referencia: {
      nombre_Usuario: {
         type: String,
      },
      fecha_modificado: {
         type: Date,
         default: new Date(),
      },
   },
   logs_calificado: {
      nombre_Usuario: {
         type: String,
      },
      fecha_modificado: {
         type: Date,
         default: new Date(),
      },
   },
   logs_master: {
      nombre_Usuario: {
         type: String,
      },
      fecha_modificado: {
         type: Date,
         default: new Date(),
      },
   },
});

export default model<UserLogs>("UserLogs", userLogsSchema);
