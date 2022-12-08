import { useState } from "react";

import * as XLSX from "xlsx";
import * as cpexcel from "xlsx/dist/cpexcel.full.mjs";
import { createNewProgram, createNewProgrammation } from "../libs/backendRequests";
import { useToken } from "../hooks/userTokenHook";
import { Alert, AlertColor } from "@mui/material";
XLSX.set_cptable(cpexcel);

const Import = () => {
   const [programmation, setProgrammation] = useState<any>({});
   const [programs, setPrograms] = useState<object[]>([{}]);
   const [alertText, setAlertText] = useState("");
   const [alertSeverity, setAlertSeverity] = useState<AlertColor>("success");
   const [openAlert, setOpenAlert] = useState(false);
   const token = useToken();

   const handleCreateProgrammation = async () => {
      const createdProgrammationResponse = await createNewProgrammation(token, programmation);
      const createdProgrammationResponseObtained = createdProgrammationResponse.data;
      programs.map(async (program, i) => {
         await createNewProgram(token, program, createdProgrammationResponseObtained._id);
      });
      setAlertText("Se importo correctamente la programación!");
      setAlertSeverity("success");
      setOpenAlert(true);
   };

   const handleFile = async (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
         var data = e.target.result;
         var workbook = XLSX.read(data, {
            type: "binary",
         });
         const sheetNames = workbook.SheetNames;
         let mergedCells = [];
         for (let worksheet of sheetNames) {
            if (workbook.Sheets[worksheet]["!merges"])
               workbook.Sheets[worksheet]["!merges"].map((merge) => {
                  const value = XLSX.utils.encode_range(merge).split(":")[0];
                  let ranges = [];
                  let c = 0;
                  for (let col = merge.s.c; col <= merge.e.c; col++) {
                     for (let row = merge.s.r; row <= merge.e.r; row++) {
                        workbook.Sheets[worksheet][String.fromCharCode(65 + col) + (row + 1)] =
                           workbook.Sheets[worksheet][value];
                        ranges[c] = {
                           data: workbook.Sheets[worksheet][String.fromCharCode(65 + col) + (row + 1)].v,
                           cell: String.fromCharCode(65 + col) + (row + 1),
                        };
                        c = c + 1;
                     }
                  }
                  mergedCells.push(ranges);
               });
         }
         const months = {
            enero: "01",
            febrero: "02",
            marzo: "03",
            abril: "04",
            mayo: "05",
            junio: "06",
            julio: "07",
            agosto: "08",
            septiembre: "09",
            octubre: "10",
            noviembre: "11",
            diciembre: "12",
         };
         const workbookData = workbook.Sheets[sheetNames[0]];
         let unifiedCells = [];
         let date = workbookData[`C4`].v.split(" ");
         let dateNum = months[`${date[6]}`];
         console.log(dateNum);
         let programation = {
            semana_Inicio: new Date(date[8].replace(".", ""), dateNum, date[2]),
            semana_Fin: new Date(date[8].replace(".", ""), dateNum, date[4]),
            semana_Programas: [],
         };
         setProgrammation(programation);
         mergedCells.map((mergedCell, j) => {
            let a = [];
            mergedCell.map((range, i) => {
               if (
                  range.data === "HERMOSILLO" ||
                  range.data.startsWith("Programación") ||
                  range.data === "TELEVISA REGIONAL" ||
                  range.data === "C12-HERMOSILLO-12.1" ||
                  range.data === "Cambios" ||
                  range.data.startsWith("Ultima actualización") ||
                  range.data === "XHAK-TV (HERMOSILLO)"
               ) {
               } else {
                  if (i === 0 || i === mergedCell.length - 1) {
                     let cell = range.cell.split("");
                     let newData = range;
                     let day = workbookData[`${cell[0]}8`].v.split(" ");
                     newData["fecha"] = day[1] + " " + dateNum + " " + date[8];
                     console.log(newData["fecha"]);
                     if (cell.length === 3) {
                        let hours = workbookData[`A${cell[1]}${cell[2]}`].v;
                        if (hours.startsWith(":")) {
                           let count = parseInt(`${cell[1]}${cell[2]}`);
                           while (hours.startsWith(":")) {
                              hours = workbookData[`A${count}`].v;
                              count = count - 1;
                           }
                           let newHours = hours.split(":");
                           let minutes = workbookData[`A${cell[1]}${cell[2]}`].v.split(":");
                           if (i === mergedCell.length - 1) {
                              minutes[1] = parseInt(minutes[1]) + 15;
                           }
                           if (minutes[1] === 60) {
                              newHours[0] = newHours[0] * 60;
                              let totalMinutes = (newHours[0] + minutes[1]) / 60;
                              newData[`fecha`] = newData["fecha"] + " " + totalMinutes + ":" + "00";
                           } else {
                              newData[`fecha`] = newData["fecha"] + " " + newHours[0] + ":" + minutes[1];
                           }
                        } else {
                           newData[`fecha`] = newData["fecha"] + " " + hours;
                        }

                        a.push(newData);
                     } else if (cell.length === 4) {
                        let hours = workbookData[`A${cell[1]}${cell[2]}${cell[3]}`].v;
                        if (hours.startsWith(":")) {
                           let count = parseInt(`${cell[1]}${cell[2]}${cell[3]}`);
                           while (hours.startsWith(":")) {
                              hours = workbookData[`A${count}`].v;
                              count = count - 1;
                           }
                           let newHours = hours.split(":");
                           let minutes = workbookData[`A${cell[1]}${cell[2]}${cell[3]}`].v.split(":");
                           // console.log(hours);
                           if (i === mergedCell.length - 1) {
                              minutes[1] = parseInt(minutes[1]) + 15;
                           }
                           if (minutes[1] === 60) {
                              newHours[0] = newHours[0] * 60;
                              let totalMinutes = (newHours[0] + minutes[1]) / 60;
                              if (totalMinutes === 24) {
                                 newData[`fecha`] = newData["fecha"] + " " + "00" + ":" + "00";
                              } else {
                                 newData[`fecha`] = newData["fecha"] + " " + totalMinutes + ":" + "00";
                              }
                           } else {
                              newData[`fecha`] = newData["fecha"] + " " + newHours[0] + ":" + minutes[1];
                           }
                        } else {
                           newData[`fecha`] = newData["fecha"] + " " + hours;
                        }
                        a.push(newData);
                     } else {
                        //Profeco
                        newData[`fecha`] = newData["fecha"] + " " + "00:00";
                        if (i === mergedCell.length - 1) {
                           newData[`fecha`] = newData["fecha"] + " " + "00:15";
                        }
                        a.push(newData);
                     }
                  }
               }
            });
            unifiedCells.push(a);
         });

         let programs = [];
         unifiedCells.map((mergedCell) => {
            let program = {
               programa_Nombre: "",
               programa_Calidad: "",
               programa_Subnombre: "",
               programa_Tipo: "",
               hora_Inicio: null,
               hora_Fin: null,
            };
            mergedCell.map((cell, i) => {
               if (cell) {
                  if (i === 0) {
                     // console.log(cell);
                     let dataSplit = cell.data.split("\n");
                     program["programa_Nombre"] = dataSplit[0];
                     if (dataSplit.length > 3) {
                        program["programa_Subnombre"] = dataSplit[4];
                        program["programa_Calidad"] = dataSplit[2];
                        program["programa_Tipo"] = dataSplit[3];
                     } else {
                        program["programa_Calidad"] = dataSplit[1];
                        program["programa_Tipo"] = dataSplit[2];
                     }
                     let dateSplit = cell.fecha.split(" ");
                     let timeSplit = dateSplit[3].split(":");

                     program["hora_Inicio"] = new Date(
                        dateSplit[2].replace(".", ""),
                        dateSplit[1] - 1,
                        dateSplit[0],
                        timeSplit[0],
                        timeSplit[1]
                     );
                     if (timeSplit[0] === "00") {
                        console.log(dateSplit, "cell", cell);
                        program["hora_Inicio"] = new Date(
                           dateSplit[2].replace(".", ""),
                           dateSplit[1] - 1,
                           dateSplit[0],
                           timeSplit[0],
                           timeSplit[1]
                        );
                     }
                  } else {
                     let dateSplit = cell.fecha.split(" ");
                     let timeSplit = dateSplit[3].split(":");
                     program["hora_Fin"] = new Date(
                        dateSplit[2].replace(".", ""),
                        dateSplit[1] - 1,
                        dateSplit[0],
                        timeSplit[0],
                        timeSplit[1]
                     );
                     if (timeSplit[0] === "00") {
                        program["hora_Fin"] = new Date(
                           dateSplit[2].replace(".", ""),
                           dateSplit[1] - 1,
                           dateSplit[0],
                           24,
                           timeSplit[1]
                        );
                     }
                  }
               }
            });
            if (program.programa_Nombre !== "") {
               programs.push(program);
            }
         });
         console.log(programs);
         setPrograms(programs);
      };
      reader.onerror = function (ex) {
         console.log(ex);
      };
      reader.readAsBinaryString(file);
   };

   return (
      <main className="d-flex">
         <div className="container vh-100">
            {openAlert ? (
               <Alert severity={alertSeverity} color="info">
                  {alertText}
               </Alert>
            ) : null}

            <div className="row p-4 justify-content-center align-items-center">
               <div className="col-auto">
                  <form>
                     <label htmlFor="exampleFormControlTextarea1" className="form-label">
                        Favor de seleccionar el archivo de excel.
                     </label>
                     <div className="input-group">
                        <input type="file" className="form-control" onChange={handleFile}></input>
                        <button
                           className="btn btn-outline-secondary"
                           onClick={handleCreateProgrammation}
                           type="button"
                           id="inputGroupFileAddon04"
                        >
                           Importar
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </main>
   );
};

export default Import;
