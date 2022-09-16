import { Router } from "express"

//Modelos de mongoDB
import Usuarios from "../models/Usuarios";
import Programacion from "../models/Programacion";

//middlewares
import verificar from "../middlewares/userExtractor";

//Libreria requerida para autenticar
import jwt from "jsonwebtoken"

//KEY
import { SECRET } from "../settings/llaves";

const router = Router()
const refreshTokens = {} 

router.post('/usuarios/add', verificar, (req, res) =>{

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

router.post('/usuarios/autenticar',  (req, res) =>{

    const { nombre_Usuario, contrasena_Usuario } = req.body;
    console.log(req.body)
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
                    const tipo_Usuario = user.tipo_Usuario;
                    const usuario = {
                        nombre_Usuario,
                        contrasena_Usuario, 
                        tipo_Usuario
                    };
                    const token = jwt.sign(usuario, SECRET, { expiresIn: 300 });

                    res.status(200).json({ token, tipo_Usuario});
                }else{
                    res.status(500).send('USUARIO Y/O CONTRASENA INCORRECTOS');
                }
            })
        }
   })
})

router.get('/usuarios/verificar', verificar, (req, res) => {
    res.status(200).json({
        valido: true
    });
})


router.post('/programacion/add', verificar, (req, res) =>{

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


router.post('/programacion/update/status', verificar, (req, res) =>{

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


router.post('/programacion/delete', verificar, (req, res) =>{

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

router.get('/programacion/list', verificar , async (req , res) => {
    await Programacion.find({}).then(
        function (programas) {
            if(programas.length<1){
                res.status(500).send('NO EXISTEN DATOS.');
            }else{
                res.status(200).send(programas);
            }
    });
});

router.get('/programacion/latest', verificar , async (req , res) => {
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