import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt'

const usuariosSchema = new Schema({
    nombre_Usuario: {
        type:String,
        required: true,
        unique: true,
        trim: true
    },
    contrasena_Usuario: {
        type:String,
        required: true,
        trim: true
    },
    tipo_Usuario: {
        usuario: {
            type: Boolean,
            default: false
        },
        usuario_web: {
            type: Boolean,
            default: false
        },
        administrador: {
            type: Boolean,
            default: false
        }
    }
})

const saltRounds = 10;

usuariosSchema.pre('save', function(next){
    if(this.isNew || this.isModified('contrasena_Usuario')){
        const document = this;
        bcrypt.hash(document.contrasena_Usuario, saltRounds, (err, hashedContrasena) =>{
            if(err){
                next(err);
            }else{
                document.contrasena_Usuario = hashedContrasena;
                next();
            }
        })
    }else{
        next();
    }
});

usuariosSchema.methods.isCorrectPassword = function(contrasena_Usuario, callback){
    bcrypt.compare(contrasena_Usuario, this.contrasena_Usuario, function(err, same){
        if(err){
            callback(err);
        }else{
            callback(err, same);
        }
    });
}

export default model('Usuarios',usuariosSchema);
