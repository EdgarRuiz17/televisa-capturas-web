import { Router } from "express"

//KEY
import { SECRET } from "../settings/llaves";

//Libreria requerida para autenticar
import jwt from "jsonwebtoken"

var verificar = Router;

verificar = (req, res, next) =>{
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if(!token){
        res.status(500).json({
            valido: false,
            mensaje: "Favor de introducir el token."
        })
        return
    }   
    if(token.startsWith('Bearer ')){
        token = token.slice(7, token.length);
        console.log(token);
    }
    if(token){
        jwt.verify(token, SECRET, (err, decoded)=>{
            if(err){
                return res.json({
                    valido: false,
                    mensaje: "Token expirado o invalido."
                });
            }else{
                req.decoded = ({
                    valido: true,
                    mensaje: "Token valido."
                });
                next();
            }
        })
    }
}

export default verificar;