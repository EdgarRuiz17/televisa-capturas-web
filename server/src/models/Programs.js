import {Schema, model} from 'mongoose';

const programsSchema = new Schema({
    programa_Dia: {
        type:Number,
        required: true
    },
    programa_Nombre:   {
        type:String,
        required: true,
        trim: true
        },
    programa_Subnombre: {
            type:String,
            required: false,
            trim: true
        },
    programa_Tipo:      {
            type:String,
            required: true,
            trim: true
        },
    programa_Calidad:   {
            type:String,
            required: true,
            trim: true
        },
    hora_Inicio:        {
            type:String,
            required: true
        },
    hora_Fin:           {
            type:String,
            required: true
        },
    programmation: {
        type: Schema.Types.ObjectId,
        ref: "Programmations"
    },
    programa_Estatus: {
            Calificado: {
                type: Boolean,
                required: true,
                default: false
            },
            Referencia: {
                type: Boolean,
                required: true,
                default: false
            },
            Master: {
                type: Boolean,
                required: true,
                default: false
            }
    }
})

export default model('Programs',programsSchema);