
export const processInformation = (data) => {

    const encabezados = ['B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const arrayProgramacion = {};
    var espacios = '';

    for (let j = 0; j < encabezados.length; j++) {

        var programa_json = {};
        var contador = 0;
        var contador3 = 0;
        var arrayHoras = [];
        var HorasConvertidas = '';
        var Programa = "";
        var i = 9;
        var l = 0;

        for (i = 9; i < 105; i++) {
            if (data['A' + i] !== undefined) {
                if (i === 9) {
                    console.log(encabezados[j])
                    if(data[encabezados[j] + i] !== undefined){
                        Programa = data[encabezados[j] + i].v;
                    }else{
                        Programa = data[encabezados[0] + i].v;
                    }
                }
                if (data['A' + i].v.endsWith(":00")) {
                    if (data[encabezados[j] + i] !== undefined) {
                        if (Programa !== data[encabezados[j] + i].v) {
                            programa_json[contador - 1]['hora_fin'] = data['A' + i].v;
                        }
                        Programa = data[encabezados[j] + i].v;
                        l = i;
                        const dataComponents = Programa.split('\n');
                        if (dataComponents.length > 3) {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: dataComponents[1],
                                tipo: dataComponents[2],
                                calidad: dataComponents[3]
                            }

                            contador++;


                        } else {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: "",
                                tipo: dataComponents[1],
                                calidad: dataComponents[2]
                            }


                            contador++;
                        }
                    } else if (data[encabezados[j-1] + i] !== undefined) {
                        console.log(i);
                        if (Programa !== data[encabezados[j-1] + i].v) {
                            programa_json[contador - 1]['hora_fin'] = data['A' + i].v;
                        }
                        Programa = data[encabezados[j-1] + i].v;
                        const dataComponents = Programa.split('\n');
                        if (dataComponents.length > 3) {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: dataComponents[1],
                                tipo: dataComponents[2],
                                calidad: dataComponents[3]
                            }

                            contador++;


                        } else {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: "",
                                tipo: dataComponents[1],
                                calidad: dataComponents[2]
                            }


                            contador++;
                        }
                    } else if (data[encabezados[j-2] + i] !== undefined){
                        if (Programa !== data[encabezados[j-2] + i].v) {
                            programa_json[contador - 1]['hora_fin'] = data['A' + i].v;
                        }
                        Programa = data[encabezados[j-2] + i].v;
                        const dataComponents = Programa.split('\n');
                        if (dataComponents.length > 3) {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: dataComponents[1],
                                tipo: dataComponents[2],
                                calidad: dataComponents[3]
                            }

                            contador++;


                        } else {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: "",
                                tipo: dataComponents[1],
                                calidad: dataComponents[2]
                            }


                            contador++;
                        }
                    } else if (data[encabezados[j-3] + i] !== undefined){
                        if (Programa !== data[encabezados[j-3] + i].v) {
                            programa_json[contador - 1]['hora_fin'] = data['A' + i].v;
                        }
                        Programa = data[encabezados[j-3] + i].v;
                        const dataComponents = Programa.split('\n');
                        if (dataComponents.length > 3) {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: dataComponents[1],
                                tipo: dataComponents[2],
                                calidad: dataComponents[3]
                            }

                            contador++;


                        } else {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: "",
                                tipo: dataComponents[1],
                                calidad: dataComponents[2]
                            }


                            contador++;
                        }
                    } else if (data[encabezados[j-4] + i] !== undefined){
                        if (Programa !== data[encabezados[j-4] + i].v) {
                            programa_json[contador - 1]['hora_fin'] = data['A' + i].v;
                        }
                        Programa = data[encabezados[j-4] + i].v;
                        const dataComponents = Programa.split('\n');
                        if (dataComponents.length > 3) {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: dataComponents[1],
                                tipo: dataComponents[2],
                                calidad: dataComponents[3]
                            }

                            contador++;


                        } else {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: "",
                                tipo: dataComponents[1],
                                calidad: dataComponents[2]
                            }


                            contador++;
                        }
                    }else if (data[encabezados[j-5] + i] !== undefined){
                        if (Programa !== data[encabezados[j-5] + i].v) {
                            programa_json[contador - 1]['hora_fin'] = data['A' + i].v;
                        }
                        Programa = data[encabezados[j-5] + i].v;
                        const dataComponents = Programa.split('\n');
                        if (dataComponents.length > 3) {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: dataComponents[1],
                                tipo: dataComponents[2],
                                calidad: dataComponents[3]
                            }

                            contador++;


                        } else {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: "",
                                tipo: dataComponents[1],
                                calidad: dataComponents[2]
                            }


                            contador++;
                        }
                    }else if (data[encabezados[j-6] + i] !== undefined){
                        if (Programa !== data[encabezados[j-6] + i].v) {
                            programa_json[contador - 1]['hora_fin'] = data['A' + i].v;
                        }
                        Programa = data[encabezados[j-6] + i].v;
                        const dataComponents = Programa.split('\n');
                        if (dataComponents.length > 3) {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: dataComponents[1],
                                tipo: dataComponents[2],
                                calidad: dataComponents[3]
                            }

                            contador++;


                        } else {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: "",
                                tipo: dataComponents[1],
                                calidad: dataComponents[2]
                            }


                            contador++;
                        }
                    }
                    arrayHoras[contador3] = data['A' + i].v;
                    contador3++;
                } else if (data['A' + i].v.endsWith(":15")) {
                    const components = arrayHoras[contador3 - 1].split(":");
                    HorasConvertidas = components[0] + data['A' + i].v;
                    if (data[encabezados[j] + i] !== undefined) {
                        if (Programa !== data[encabezados[j] + i].v) {
                            programa_json[contador - 1]['hora_fin'] = HorasConvertidas;
                        }
                        Programa = data[encabezados[j] + i].v;
                        const dataComponents = Programa.split('\n');
                        if (dataComponents.length > 3) {
                            programa_json[contador] =
                            {
                                hora_inicio: HorasConvertidas,
                                programa: dataComponents[0],
                                nombre: dataComponents[1],
                                tipo: dataComponents[2],
                                calidad: dataComponents[3]
                            }
                            contador++;


                        } else {
                            programa_json[contador] =
                            {
                                hora_inicio: HorasConvertidas,
                                programa: dataComponents[0],
                                nombre: "",
                                tipo: dataComponents[1],
                                calidad: dataComponents[2]
                            }


                            contador++;
                        }
                    }else if (data[encabezados[j-1] + i] !== undefined) {
                        if (Programa !== data[encabezados[j-1] + i].v) {
                            programa_json[contador - 1]['hora_fin'] = data['A' + i].v;
                        }
                        Programa = data[encabezados[j-1] + i].v;
                        const dataComponents = Programa.split('\n');
                        if (dataComponents.length > 3) {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: dataComponents[1],
                                tipo: dataComponents[2],
                                calidad: dataComponents[3]
                            }

                            contador++;


                        } else {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: "",
                                tipo: dataComponents[1],
                                calidad: dataComponents[2]
                            }


                            contador++;
                        }
                    } else if (data[encabezados[j-2] + i] !== undefined){
                        if (Programa !== data[encabezados[j-2] + i].v) {
                            programa_json[contador - 1]['hora_fin'] = data['A' + i].v;
                        }
                        Programa = data[encabezados[j-2] + i].v;
                        const dataComponents = Programa.split('\n');
                        if (dataComponents.length > 3) {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: dataComponents[1],
                                tipo: dataComponents[2],
                                calidad: dataComponents[3]
                            }

                            contador++;


                        } else {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: "",
                                tipo: dataComponents[1],
                                calidad: dataComponents[2]
                            }


                            contador++;
                        }
                    } else if (data[encabezados[j-3] + i] !== undefined){
                        if (Programa !== data[encabezados[j-3] + i].v) {
                            programa_json[contador - 1]['hora_fin'] = data['A' + i].v;
                        }
                        Programa = data[encabezados[j-3] + i].v;
                        const dataComponents = Programa.split('\n');
                        if (dataComponents.length > 3) {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: dataComponents[1],
                                tipo: dataComponents[2],
                                calidad: dataComponents[3]
                            }

                            contador++;


                        } else {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: "",
                                tipo: dataComponents[1],
                                calidad: dataComponents[2]
                            }


                            contador++;
                        }
                    } else if (data[encabezados[j-4] + i] !== undefined){
                        if (Programa !== data[encabezados[j-4] + i].v) {
                            programa_json[contador - 1]['hora_fin'] = data['A' + i].v;
                        }
                        Programa = data[encabezados[j-4] + i].v;
                        const dataComponents = Programa.split('\n');
                        if (dataComponents.length > 3) {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: dataComponents[1],
                                tipo: dataComponents[2],
                                calidad: dataComponents[3]
                            }

                            contador++;


                        } else {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: "",
                                tipo: dataComponents[1],
                                calidad: dataComponents[2]
                            }


                            contador++;
                        }
                    }else if (data[encabezados[j-5] + i] !== undefined){
                        if(l !== i-1){
                            if (Programa !== data[encabezados[j-5] + i].v) {
                                programa_json[contador - 1]['hora_fin'] = data['A' + i].v;
                            }
                            Programa = data[encabezados[j-5] + i].v;
                            const dataComponents = Programa.split('\n');
                            if (dataComponents.length > 3) {
                                programa_json[contador] =
                                {
                                    hora_inicio: data['A' + i].v,
                                    programa: dataComponents[0],
                                    nombre: dataComponents[1],
                                    tipo: dataComponents[2],
                                    calidad: dataComponents[3]
                                }

                                contador++;


                            } else {
                                programa_json[contador] =
                                {
                                    hora_inicio: data['A' + i].v,
                                    programa: dataComponents[0],
                                    nombre: "",
                                    tipo: dataComponents[1],
                                    calidad: dataComponents[2]
                                }


                                contador++;
                            }
                        }
                    }else if (data[encabezados[j-6] + i] !== undefined){
                        if (Programa !== data[encabezados[j-6] + i].v) {
                            programa_json[contador - 1]['hora_fin'] = data['A' + i].v;
                        }
                        Programa = data[encabezados[j-6] + i].v;
                        const dataComponents = Programa.split('\n');
                        if (dataComponents.length > 3) {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: dataComponents[1],
                                tipo: dataComponents[2],
                                calidad: dataComponents[3]
                            }

                            contador++;


                        } else {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: "",
                                tipo: dataComponents[1],
                                calidad: dataComponents[2]
                            }


                            contador++;
                        }
                    }

                } else if (data['A' + i].v.endsWith(":45") || data['A' + i].v.endsWith(":30")) {
                    const components = arrayHoras[contador3 - 1].split(":");
                    HorasConvertidas = components[0] + data['A' + i].v;
                    if (data[encabezados[j] + i] !== undefined) {
                        if (Programa !== data[encabezados[j] + i].v) {
                            programa_json[contador - 1]['hora_fin'] = HorasConvertidas;
                        }
                        Programa = data[encabezados[j] + i].v;
                        const dataComponents = Programa.split('\n');
                        if (dataComponents.length > 3) {
                            programa_json[contador] =
                            {
                                hora_inicio: HorasConvertidas,
                                programa: dataComponents[0],
                                nombre: dataComponents[1],
                                tipo: dataComponents[2],
                                calidad: dataComponents[3]
                            }
                            contador++;


                        } else {
                            programa_json[contador] =
                            {
                                hora_inicio: HorasConvertidas,
                                programa: dataComponents[0],
                                nombre: "",
                                tipo: dataComponents[1],
                                calidad: dataComponents[2]
                            }


                            contador++;
                        }
                    }else if (data[encabezados[j-1] + i] !== undefined) {
                        if (Programa !== data[encabezados[j-1] + i].v) {
                            programa_json[contador - 1]['hora_fin'] = data['A' + i].v;
                        }
                        Programa = data[encabezados[j-1] + i].v;
                        const dataComponents = Programa.split('\n');
                        if (dataComponents.length > 3) {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: dataComponents[1],
                                tipo: dataComponents[2],
                                calidad: dataComponents[3]
                            }

                            contador++;


                        } else {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: "",
                                tipo: dataComponents[1],
                                calidad: dataComponents[2]
                            }


                            contador++;
                        }
                    } else if (data[encabezados[j-2] + i] !== undefined){
                        if (Programa !== data[encabezados[j-2] + i].v) {
                            programa_json[contador - 1]['hora_fin'] = data['A' + i].v;
                        }
                        Programa = data[encabezados[j-2] + i].v;
                        const dataComponents = Programa.split('\n');
                        if (dataComponents.length > 3) {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: dataComponents[1],
                                tipo: dataComponents[2],
                                calidad: dataComponents[3]
                            }

                            contador++;


                        } else {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: "",
                                tipo: dataComponents[1],
                                calidad: dataComponents[2]
                            }


                            contador++;
                        }
                    } else if (data[encabezados[j-3] + i] !== undefined){
                        if (Programa !== data[encabezados[j-3] + i].v) {
                            programa_json[contador - 1]['hora_fin'] = data['A' + i].v;
                        }
                        Programa = data[encabezados[j-3] + i].v;
                        const dataComponents = Programa.split('\n');
                        if (dataComponents.length > 3) {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: dataComponents[1],
                                tipo: dataComponents[2],
                                calidad: dataComponents[3]
                            }

                            contador++;


                        } else {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: "",
                                tipo: dataComponents[1],
                                calidad: dataComponents[2]
                            }


                            contador++;
                        }
                    } else if (data[encabezados[j-4] + i] !== undefined){
                        if (Programa !== data[encabezados[j-4] + i].v) {
                            programa_json[contador - 1]['hora_fin'] = data['A' + i].v;
                        }
                        Programa = data[encabezados[j-4] + i].v;
                        const dataComponents = Programa.split('\n');
                        if (dataComponents.length > 3) {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: dataComponents[1],
                                tipo: dataComponents[2],
                                calidad: dataComponents[3]
                            }

                            contador++;


                        } else {
                            programa_json[contador] =
                            {
                                hora_inicio: data['A' + i].v,
                                programa: dataComponents[0],
                                nombre: "",
                                tipo: dataComponents[1],
                                calidad: dataComponents[2]
                            }


                            contador++;
                        }
                    }
                }
            }
        }
        espacios = data[encabezados[j] + 8].v;
        arrayProgramacion[espacios.replace(/ /g, "")] = programa_json;
        console.log(arrayProgramacion);
    }
    return arrayProgramacion;
}
