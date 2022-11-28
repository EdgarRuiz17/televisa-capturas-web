import Users from "../models/Users";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { SECRET } from "../settings/llaves";
import { Request, Response } from "express";

export const verifyUserToken = (req: any, res: Response) => {
   res.status(200).json(req.decoded);
};

export const getAllUsers = async (req: Request, res: Response) => {
   Users.find({}).then((users) => {
      return res.status(200).send(users);
   });
};

export const addNewUser = (req: Request, res: Response) => {
   const { nombre_Usuario, contrasena_Usuario, tipo_Usuario } = req.body;

   const usuario = new Users({ nombre_Usuario, contrasena_Usuario, tipo_Usuario });

   usuario.save((err) => {
      if (err) {
         res.status(500).send(err);
      } else {
         res.status(200).send("USUARIO REGISTRADO");
      }
   });
};

export const logInUser = (req: Request, res: Response) => {
   console.log(req.body);
   const { nombre_Usuario, contrasena_Usuario } = req.body;
   Users.findOne({ nombre_Usuario }, (err, user) => {
      if (err) {
         res.status(201).json({
            acceso: "false",
            mensaje: "ERROR AL AUTENTICAR AL USUARIO",
            token: "",
            tipo_Usuario: {
               administrador: false,
               usuario: false,
               usuario_web: false,
            },
         });
      } else if (!user) {
         res.status(201).json({
            acceso: "false",
            mensaje: "EL USUARIO NO EXISTE",
            token: "",
            tipo_Usuario: {
               administrador: false,
               usuario: false,
               usuario_web: false,
            },
         });
      } else {
         user.isCorrectPassword(contrasena_Usuario, (err, result) => {
            if (err) {
               res.status(201).json({
                  acceso: "false",
                  mensaje: "ERROR AL AUTENTICAR",
                  token: "",
                  tipo_Usuario: {
                     administrador: false,
                     usuario: false,
                     usuario_web: false,
                  },
               });
            } else if (result) {
               const tipo_Usuario = user.tipo_Usuario;
               const _id = user._id;
               const usuario = {
                  _id,
                  nombre_Usuario,
                  contrasena_Usuario,
                  tipo_Usuario,
               };
               const token = jwt.sign(usuario, SECRET, { expiresIn: 1200 });

               res.status(200).json({
                  acceso: "true",
                  mensaje: "EL USUARIO FUE AUTENTIFICADO",
                  token,
                  tipo_Usuario,
               });
            } else {
               res.status(201).json({
                  acceso: "false",
                  mensaje: "CONTRASENA INCORRECTA",
                  token: "",
                  tipo_Usuario: {
                     administrador: false,
                     usuario: false,
                     usuario_web: false,
                  },
               });
            }
         });
      }
   });
};

export const updateUserById = async (req: Request, res: Response) => {
   const { userId } = req.params;

   const UserToModify = await Users.findOne({ _id: userId });
   if (!UserToModify) return res.status(500).send("User not found");

   UserToModify.$set(req.body);

   UserToModify.markModified("UPDATED");

   UserToModify.save((err) => {
      if (err) {
         res.status(200).send("Name already in use");
      } else {
         res.status(202).send("User updated successfully");
      }
   });
};

export const deleteUserById = (req: Request, res: Response) => {
   const { userId } = req.params;

   Users.findOneAndDelete({ _id: userId }, function (err, deleted) {
      if (err) return res.status(500).send("User not found");
      return res.status(200).send("User deleted successfully");
   });
};
