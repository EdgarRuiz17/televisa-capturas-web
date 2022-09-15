import { Router } from "express"
import Usuarios from "../models/Usuarios";
import Programacion from "../models/Programacion";
import { SECRET } from "../settings/llaves";
import jwt from "jsonwebtoken"
import randtoken from "rand-token"

const router = Router()
const refreshTokens = {} 

router.post('/usuarios/add',  (req, res) =>{

    const {nombre_Usuario, contrasena_Usuario, tipo_Usuario} = req.body;

    const usuario = new Usuarios({nombre_Usuario,contrasena_Usuario,tipo_Usuario});

    usuario.save(err =>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send('USUARIO REGISTRADO');
            }
    });
});

router.get('/usuarios/autenticar',  (req, res) =>{

    const { nombre_Usuario, contrasena_Usuario } = req.body;

    Usuarios.findOne({nombre_Usuario}, (err, user) =>{
        if(err){
            res.status(500).send('ERROR AL AUTENTICAR AL USUARIO');
        }else if(!user){
            res.status(500).send('EL USUARIO NO EXISTE');
        }else{
            user.isCorrectPassword(contrasena_Usuario, (err, result) =>{
                if(err){
                    res.status(500).send('ERROR AL AUTENTICAR')
                }else if(result){
                    const usuario = {
                        nombre_Usuario,
                        contrasena_Usuario, 
                        tipo_Usuario: user.tipo_Usuario
                    };
                    const token = jwt.sign(usuario, SECRET, { expiresIn: 300 });
                    const refreshToken = randtoken.uid(256);
                    refreshTokens[refreshToken] = nombre_Usuario;
                    res.json({token: 'JWT ' + token, refreshToken: refreshToken});
                }else{
                    res.status(500).send('USUARIO Y/O CONTRASENA INCORRECTOS');
                }
            })
        }
   })
})

router.get('/usuarios/validar', (req, res)=>{
    
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
                res.json({
                    valido: true,
                    mensaje: "Token valido."
                });
            }
        })
    }
})


router.post('/programacion/add', (req, res) =>{

    console.log(req.body);

     Programacion.create(req.body,function(err,creado){
        if(err){
            console.log(err)
            res.status(500).send('HUBO UN PROBLEMA AL GUARDAR.');
        }
        else{
            res.status(200).send('PROGRAMACION ALMACENADA CORRECTAMENTE.');
        }
     })

})


router.post('/programacion/update/status', (req, res) =>{

    const {_id, dia_id, datos } = req.body;

    Programacion.findOneAndUpdate(
        { "_id": _id, "semana_Programas._id": dia_id},
        {
            "$set": {
                "semana_Programas.$.programa_Estatus": datos
            }
        }
        ,function(err,creado){
            if(err){
                console.log(err)
                res.status(500).send('HUBO UN PROBLEMA AL ACTUALIZAR EL ESTATUS.');
            }
            else{
                res.status(200).send(creado);
            }
    })
})


router.post('/programacion/delete', (req, res) =>{

    const { _id } = req.body;
    
    Programacion.deleteOne({ _id: _id },function(err, eliminado){
       if(err){
           console.log(err)
           res.status(500).send('HUBO UN PROBLEMA AL ELIMINAR.');
       }else{
           res.status(200).send('PROGRAMACION ELIMINADA CORRECTAMENTE.');
       }
    })

})

router.get('/programacion/list' , async (req , res) => {
    await Programacion.find({}).then(
        function (programas) {
            if(programas.length<1){
                res.status(500).send('NO EXISTEN DATOS.');
            }else{
                res.status(200).send(programas);
            }
    });
});

router.get('/programacion/latest' , async (req , res) => {
    await Programacion.findOne().sort({_id:-1}).limit(1).then(
        function (programa) {
            if(!programa){
                res.status(500).send('NO EXISTEN DATOS.');
            }else{
                res.status(200).send(programa);
            }
        }
    )
});



export default router;