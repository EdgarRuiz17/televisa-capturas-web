import { NextFunction, Router, Response, Request } from "express";

//KEY
import { SECRET } from "../settings/llaves";

//Libreria requerida para autenticar
import * as jwt from "jsonwebtoken";

function verify(req: any, res: Response, next: NextFunction) {
   let token: any = req.headers["x-access-token"] || req.headers["authorization"];
   console.log(token);
   if (!token) {
      res.status(500).json({
         valido: false,
         mensaje: "Favor de introducir el token.",
      });
      return;
   }
   if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
      console.log(token);
   }
   if (token) {
      jwt.verify(token, SECRET, (err, decoded) => {
         if (err) {
            return res.json({
               valido: false,
               mensaje: "Token expirado o invalido.",
            });
         } else {
            console.log(decoded);
            req.decoded = {
               valido: true,
               mensaje: "Token valido.",
               user_data: {
                  _id: decoded._id,
                  nombre_Usuario: decoded.nombre_Usuario,
                  contrasena_Usuario: decoded.contrasena_Usuario,
                  tipo_Usuario: decoded.tipo_Usuario,
               },
            };
            next();
         }
      });
   } else {
      res.status(500).json({
         valido: false,
         mensaje: "Something went wrong.",
      });
      return;
   }
}

export default verify;
