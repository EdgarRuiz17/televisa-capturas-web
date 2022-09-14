import React from 'react'
import axios from 'axios'

const Prueba = () => {

    const Mandar = async () => {
        await axios.post("http://localhost:9000/programacion/add", {
            "semana_Inicio": "3/08/22",
            "semana_Fin": "10/08/22",
            "semana_Programas": [
                { 
                    "programa_Dia": 1, 
                    "programa_Datps": [
                        {
                            "programa_Nombre": "Que Chilo",
                            "programa_Tipo": "Grabado",
                            "programa_Calidad": "HD",
                            "hora_Inicio": "12:30",
                            "hora_Fin": "1:00"
                        }
                    ] 
                }
            ]}
        ).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }


  return (
    <div>
        <button onClick={ Mandar }>
            Mandar
        </button>
    </div>
  )
}

export default Prueba