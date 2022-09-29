import React, { useEffect, useState } from 'react'
import { Menu } from '../components/Menu'
import { processInformation } from '../functions/procesarExcel';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import * as XLSX from "xlsx";

const Import = () => {

    const navigate = useNavigate();

    const [datos, setDatos] = useState(null);

    // useEffect(() => {
    //     setInterval( verificarToken, 50000);
    // },[])

    const [renderizar, setRenderizar] = useState(false)

    // useEffect(()=>{
    //    mostrar();
    // },[renderizar])

    // const mostrar = () =>{
    //     return <Modal/>
    // }

    // const verificarToken = async() =>{
    //     await axios.get("http://localhost:9000/usuarios/verificar",     
    //             { headers: {"Authorization" : `Bearer ${localStorage.getItem('Token')}`} }
    //         ).then( function (res) {
    //             const valido = res.data.valido;
    //             if(valido){
    //                 setRenderizar(!true);
    //             }else{
    //                 localStorage.removeItem('key');
                   
    //             }
    //         }).catch(function (error) {
              
    //         })
    // }

    const MostrarDatos = () => {
        if(datos){
            return (
                <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" className="scrollspy-example bg-light p-3 rounded-2" tabindex="0"
                style={{ height: '600px', overflowY: 'scroll'  }}
                >
                  <pre>{JSON.stringify(datos,null,2)}</pre>
                </div>
                );
        }
    }

    const onChange = (e) => {
        
        const [file] = e.target.files;
        const reader = new FileReader();

        reader.onload = (evt) => {
            const bstr = evt.target.result;
            console.log(bstr)
            const workbook = XLSX.read(bstr, { type: "binary",  raw: false });
            const workbookSheets = workbook.SheetNames;
            const sheet = workbookSheets[0];
            const data = workbook.Sheets[sheet];
            console.log(JSON.stringify(data))
            const dataProcesada = processInformation(data);
            console.log(dataProcesada);
            setDatos(dataProcesada);

        };
        reader.readAsBinaryString(file);


    };



    return (
        <main class="d-flex">
            <div className='container vh-100'>
                <div className='row p-4 justify-content-center align-items-center'>
                    <div className='col-auto'>
                        <form>
                            <label for="exampleFormControlTextarea1" class="form-label">Favor de seleccionar el archivo de excel.</label>
                            <div class="input-group">
                                <input type="file" class="form-control"
                                    onChange={onChange} ></input>
                                <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Importar</button>
                            </div>
                        </form>
                    </div>
                </div>
                <MostrarDatos />
                
            </div>
        </main>
    )
}

export default Import