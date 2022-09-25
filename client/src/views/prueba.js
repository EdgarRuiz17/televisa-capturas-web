import React from 'react'
import axios from 'axios'

const Prueba = () => {

    const Mandar = async () => {
        await axios.get("http://localhost:9000/programacion/list"
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