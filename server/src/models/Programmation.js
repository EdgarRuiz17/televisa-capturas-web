import {Schema, model} from 'mongoose';

const programationSchema = new Schema({
    semana_Inicio: {
        type:String,
        required: true
    },
    semana_Fin: {
        type:String,
        required: true
    },
    semana_Programas: 
    [
        {
            type: Schema.Types.ObjectId,
            ref: "Programs"
        }
    ]
})

export default model('Programmations',programationSchema);