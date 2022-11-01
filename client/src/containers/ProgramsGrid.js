import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Button, Grid } from "@mui/material";
import { getLatestProgrammation, getProgrammationById } from "../backend/backendRequests";
import { useParams } from "react-router-dom";
import { useToken } from "../hooks/userTokenHook";

const headCells = [
   {
      id: "lunes",
      numeric: false,
      disablePadding: false,
      label: "Lunes",
   },
   {
      id: "martes",
      numeric: true,
      disablePadding: false,
      label: "Martes",
   },
   {
      id: "Miercoles",
      numeric: true,
      disablePadding: false,
      label: "Miercoles",
   },
   {
      id: "Jueves",
      numeric: true,
      disablePadding: false,
      label: "Jueves",
   },
   {
      id: "Viernes",
      numeric: true,
      disablePadding: false,
      label: "Viernes",
   },
   {
      id: "Sabado",
      numeric: true,
      disablePadding: false,
      label: "Sabado",
   },
   {
      id: "Domingo",
      numeric: true,
      disablePadding: false,
      label: "Domingo",
   },
];

function EnhancedTableHead() {
   return (
      <TableHead>
         <TableRow>
            {headCells.map((headCell) => (
               <TableCell key={headCell.id} align={"center"} padding={"normal"} sx={{ bgcolor: "white", pl: 7 }}>
                  <TableSortLabel active={false}>
                     <Typography variant="h6">{headCell.label}</Typography>
                  </TableSortLabel>
               </TableCell>
            ))}
         </TableRow>
      </TableHead>
   );
}

export default function ProgramsGrid() {
   const { programId } = useParams();
   const [data, setData] = React.useState();
   const [programs, setPrograms] = React.useState();
   const token = useToken();

   React.useEffect(() => {
      if (programId) {
         const fetchProgrammationAndProgramsById = async () => {
            const programmationsResponse = await getProgrammationById(token, programId);
            const programmationsResponseData = programmationsResponse.data;
            console.log(programmationsResponseData);
            setData(programmationsResponseData);
            getHeightByTime(programmationsResponseData.semana_Programas);
         };
         fetchProgrammationAndProgramsById();
      } else {
         const fetchLatestProgrammationAndPrograms = async () => {
            const programmationsResponse = await getLatestProgrammation();
            const programmationsResponseData = programmationsResponse.data;
            console.log(programmationsResponseData);
            setData(programmationsResponseData);
            getHeightByTime(programmationsResponseData.semana_Programas);
         };
         fetchLatestProgrammationAndPrograms();
      }
   }, []);

   const getHeightByTime = (data) => {
      var programs = {
         dia1: [],
         dia2: [],
         dia3: [],
         dia4: [],
         dia5: [],
         dia6: [],
         dia7: [],
      };

      data.map((program) => {
         const inicio = program.hora_Inicio.substring(0, 2);
         const fin = program.hora_Fin.substring(0, 2);
         const inicio2 = program.hora_Inicio.substring(3, 5);
         const fin2 = program.hora_Fin.substring(3, 5);
         const firstPart = (fin - inicio) * 60;
         let secondPart;
         // const secondPart = fin2 - inicio2;
         if (inicio2 > fin2) {
            secondPart = inicio2 - fin2;
         } else {
            secondPart = fin2 - inicio2;
         }
         console.log("Primera y segunda parte", fin2, inicio2);
         if (program.programa_Dia === 1) {
            programs.dia1.push({
               id: program._id,
               programa_Calidad: program.programa_Calidad,
               programa_Estatus: program.programa_Estatus,
               programa_Nombre: program.programa_Nombre,
               programa_Tipo: program.programa_Tipo,
               programa_Dia: program.programa_Dia,
               hora_Inicio: program.hora_Inicio,
               hora_Fin: program.hora_Fin,
               height: (firstPart - secondPart) * 1.8,
            });
         } else if (program.programa_Dia === 2) {
            programs.dia2.push({
               id: program._id,
               programa_Calidad: program.programa_Calidad,
               programa_Estatus: program.programa_Estatus,
               programa_Nombre: program.programa_Nombre,
               programa_Tipo: program.programa_Tipo,
               programa_Dia: program.programa_Dia,
               hora_Inicio: program.hora_Inicio,
               hora_Fin: program.hora_Fin,
               height: (firstPart - secondPart) * 1.2,
            });
         } else if (program.programa_Dia === 3) {
            programs.dia3.push({
               id: program._id,
               programa_Calidad: program.programa_Calidad,
               programa_Estatus: program.programa_Estatus,
               programa_Nombre: program.programa_Nombre,
               programa_Tipo: program.programa_Tipo,
               programa_Dia: program.programa_Dia,
               hora_Inicio: program.hora_Inicio,
               hora_Fin: program.hora_Fin,
               height: firstPart - secondPart,
            });
         } else if (program.programa_Dia === 4) {
            programs.dia4.push({
               id: program._id,
               programa_Calidad: program.programa_Calidad,
               programa_Estatus: program.programa_Estatus,
               programa_Nombre: program.programa_Nombre,
               programa_Tipo: program.programa_Tipo,
               programa_Dia: program.programa_Dia,
               hora_Inicio: program.hora_Inicio,
               hora_Fin: program.hora_Fin,
               height: firstPart - secondPart,
            });
         } else if (program.programa_Dia === 5) {
            programs.dia5.push({
               id: program._id,
               programa_Calidad: program.programa_Calidad,
               programa_Estatus: program.programa_Estatus,
               programa_Nombre: program.programa_Nombre,
               programa_Tipo: program.programa_Tipo,
               programa_Dia: program.programa_Dia,
               hora_Inicio: program.hora_Inicio,
               hora_Fin: program.hora_Fin,
               height: firstPart - secondPart,
            });
         } else if (program.programa_Dia === 6) {
            programs.dia6.push({
               id: program._id,
               programa_Calidad: program.programa_Calidad,
               programa_Estatus: program.programa_Estatus,
               programa_Nombre: program.programa_Nombre,
               programa_Tipo: program.programa_Tipo,
               programa_Dia: program.programa_Dia,
               hora_Inicio: program.hora_Inicio,
               hora_Fin: program.hora_Fin,
               height: firstPart - secondPart,
            });
         } else if (program.programa_Dia === 7) {
            programs.dia7.push({
               id: program._id,
               programa_Calidad: program.programa_Calidad,
               programa_Estatus: program.programa_Estatus,
               programa_Nombre: program.programa_Nombre,
               programa_Tipo: program.programa_Tipo,
               programa_Dia: program.programa_Dia,
               hora_Inicio: program.hora_Inicio,
               hora_Fin: program.hora_Fin,
               height: firstPart - secondPart,
            });
         }
      });
      console.log(programs);
      setPrograms(programs);
   };

   return (
      <Box sx={{ width: "1320px" }}>
         <Paper sx={{ width: "100%", mb: 2, bgcolor: "whitesmoke" }}>
            {data ? (
               <Typography sx={{ p: 1, pl: 5 }} variant="h6">
                  {data.semana_Inicio} - {data.semana_Fin}
               </Typography>
            ) : (
               ""
            )}
            <TableContainer>
               <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={"medium"}>
                  <EnhancedTableHead />
               </Table>
            </TableContainer>

            <Box sx={{ overflow: "scroll" }}>
               <Grid container spacing={{ xs: 5, md: 24 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ maxHeight: 800 }}>
                  <Grid item xs={1} container direction="column">
                     {programs ? (
                        <>
                           {programs.dia1.map((program) => {
                              return (
                                 <Button
                                    sx={{
                                       width: "170px",
                                       height: program.height,
                                       bgcolor: "white",
                                       border: "solid",
                                       borderColor: "black",
                                       borderWidth: "1px",
                                    }}
                                 >
                                    {program.height < 90 ? (
                                       <Grid item container xs direction="column">
                                          <Typography variant="h7">{program.programa_Nombre}</Typography>
                                          <Grid direction="row">
                                             <Typography variant="h8">{program.hora_Inicio}</Typography>
                                             <Typography variant="h8"> - </Typography>
                                             <Typography variant="h8">{program.hora_Fin}</Typography>
                                          </Grid>
                                       </Grid>
                                    ) : (
                                       <Grid item container xs direction="column">
                                          <Typography variant="h7">{program.programa_Nombre}</Typography>
                                          <Typography variant="h8">{program.hora_Inicio}</Typography>
                                          <Typography variant="h8">-</Typography>
                                          <Typography variant="h8">{program.hora_Fin}</Typography>
                                       </Grid>
                                    )}
                                 </Button>
                              );
                           })}
                        </>
                     ) : (
                        <></>
                     )}
                  </Grid>
                  <Grid item xs={1} container direction="column">
                     {programs ? (
                        <>
                           {programs.dia2.map((program) => {
                              return (
                                 <Button
                                    sx={{
                                       width: "170px",
                                       height: program.height,
                                       bgcolor: "white",
                                       border: "solid",
                                       borderColor: "black",
                                       borderWidth: "1px",
                                    }}
                                 >
                                    {program.height < 90 ? (
                                       <Grid item container xs direction="column">
                                          <Typography variant="h7">{program.programa_Nombre}</Typography>
                                          <Grid direction="row">
                                             <Typography variant="h8">{program.hora_Inicio}</Typography>
                                             <Typography variant="h8"> - </Typography>
                                             <Typography variant="h8">{program.hora_Fin}</Typography>
                                          </Grid>
                                       </Grid>
                                    ) : (
                                       <Grid item container xs direction="column">
                                          <Typography variant="h7">{program.programa_Nombre}</Typography>
                                          <Typography variant="h8">{program.hora_Inicio}</Typography>
                                          <Typography variant="h8">-</Typography>
                                          <Typography variant="h8">{program.hora_Fin}</Typography>
                                       </Grid>
                                    )}
                                 </Button>
                              );
                           })}
                        </>
                     ) : (
                        <></>
                     )}
                  </Grid>
                  <Grid item xs={1} container direction="column">
                     {programs ? (
                        <>
                           {programs.dia3.map((program) => {
                              return (
                                 <Button
                                    sx={{
                                       width: "170px",
                                       height: program.height,
                                       bgcolor: "white",
                                       border: "solid",
                                       borderColor: "black",
                                       borderWidth: "1px",
                                    }}
                                 >
                                    {program.height < 90 ? (
                                       <Grid item container xs direction="column">
                                          <Typography variant="h7">{program.programa_Nombre}</Typography>
                                          <Grid direction="row">
                                             <Typography variant="h8">{program.hora_Inicio}</Typography>
                                             <Typography variant="h8"> - </Typography>
                                             <Typography variant="h8">{program.hora_Fin}</Typography>
                                          </Grid>
                                       </Grid>
                                    ) : (
                                       <Grid item container xs direction="column">
                                          <Typography variant="h7">{program.programa_Nombre}</Typography>
                                          <Typography variant="h8">{program.hora_Inicio}</Typography>
                                          <Typography variant="h8">-</Typography>
                                          <Typography variant="h8">{program.hora_Fin}</Typography>
                                       </Grid>
                                    )}
                                 </Button>
                              );
                           })}
                        </>
                     ) : (
                        <></>
                     )}
                  </Grid>
                  <Grid item xs={1} container direction="column">
                     {programs ? (
                        <>
                           {programs.dia4.map((program) => {
                              return (
                                 <Button
                                    sx={{
                                       width: "170px",
                                       height: program.height,
                                       bgcolor: "white",
                                       border: "solid",
                                       borderColor: "black",
                                       borderWidth: "1px",
                                    }}
                                 >
                                    {program.height < 90 ? (
                                       <Grid item container xs direction="column">
                                          <Typography variant="h7">{program.programa_Nombre}</Typography>
                                          <Grid direction="row">
                                             <Typography variant="h8">{program.hora_Inicio}</Typography>
                                             <Typography variant="h8"> - </Typography>
                                             <Typography variant="h8">{program.hora_Fin}</Typography>
                                          </Grid>
                                       </Grid>
                                    ) : (
                                       <Grid item container xs direction="column">
                                          <Typography variant="h7">{program.programa_Nombre}</Typography>
                                          <Typography variant="h8">{program.hora_Inicio}</Typography>
                                          <Typography variant="h8">-</Typography>
                                          <Typography variant="h8">{program.hora_Fin}</Typography>
                                       </Grid>
                                    )}
                                 </Button>
                              );
                           })}
                        </>
                     ) : (
                        <></>
                     )}
                  </Grid>
                  <Grid item xs={1} container direction="column">
                     {programs ? (
                        <>
                           {programs.dia5.map((program) => {
                              return (
                                 <Button
                                    sx={{
                                       width: "170px",
                                       height: program.height,
                                       bgcolor: "white",
                                       border: "solid",
                                       borderColor: "black",
                                       borderWidth: "1px",
                                    }}
                                 >
                                    {program.height < 90 ? (
                                       <Grid item container xs direction="column">
                                          <Typography variant="h7">{program.programa_Nombre}</Typography>
                                          <Grid direction="row">
                                             <Typography variant="h8">{program.hora_Inicio}</Typography>
                                             <Typography variant="h8"> - </Typography>
                                             <Typography variant="h8">{program.hora_Fin}</Typography>
                                          </Grid>
                                       </Grid>
                                    ) : (
                                       <Grid item container xs direction="column">
                                          <Typography variant="h7">{program.programa_Nombre}</Typography>
                                          <Typography variant="h8">{program.hora_Inicio}</Typography>
                                          <Typography variant="h8">-</Typography>
                                          <Typography variant="h8">{program.hora_Fin}</Typography>
                                       </Grid>
                                    )}
                                 </Button>
                              );
                           })}
                        </>
                     ) : (
                        <></>
                     )}
                  </Grid>
                  <Grid item xs={1} container direction="column">
                     {programs ? (
                        <>
                           {programs.dia6.map((program) => {
                              return (
                                 <Button
                                    sx={{
                                       width: "170px",
                                       height: program.height,
                                       bgcolor: "white",
                                       border: "solid",
                                       borderColor: "black",
                                       borderWidth: "1px",
                                    }}
                                 >
                                    {program.height < 90 ? (
                                       <Grid item container xs direction="column">
                                          <Typography variant="h7">{program.programa_Nombre}</Typography>
                                          <Grid direction="row">
                                             <Typography variant="h8">{program.hora_Inicio}</Typography>
                                             <Typography variant="h8"> - </Typography>
                                             <Typography variant="h8">{program.hora_Fin}</Typography>
                                          </Grid>
                                       </Grid>
                                    ) : (
                                       <Grid item container xs direction="column">
                                          <Typography variant="h7">{program.programa_Nombre}</Typography>
                                          <Typography variant="h8">{program.hora_Inicio}</Typography>
                                          <Typography variant="h8">-</Typography>
                                          <Typography variant="h8">{program.hora_Fin}</Typography>
                                       </Grid>
                                    )}
                                 </Button>
                              );
                           })}
                        </>
                     ) : (
                        <></>
                     )}
                  </Grid>
                  <Grid item xs={1} container direction="column">
                     {programs ? (
                        <>
                           {programs.dia7.map((program) => {
                              return (
                                 <Button
                                    sx={{
                                       width: "170px",
                                       height: program.height,
                                       bgcolor: "white",
                                       border: "solid",
                                       borderColor: "black",
                                       borderWidth: "1px",
                                    }}
                                 >
                                    {program.height < 90 ? (
                                       <Grid item container xs direction="column">
                                          <Typography variant="h7">{program.programa_Nombre}</Typography>
                                          <Grid direction="row">
                                             <Typography variant="h8">{program.hora_Inicio}</Typography>
                                             <Typography variant="h8"> - </Typography>
                                             <Typography variant="h8">{program.hora_Fin}</Typography>
                                          </Grid>
                                       </Grid>
                                    ) : (
                                       <Grid item container xs direction="column">
                                          <Typography variant="h7">{program.programa_Nombre}</Typography>
                                          <Typography variant="h8">{program.hora_Inicio}</Typography>
                                          <Typography variant="h8">-</Typography>
                                          <Typography variant="h8">{program.hora_Fin}</Typography>
                                       </Grid>
                                    )}
                                 </Button>
                              );
                           })}
                        </>
                     ) : (
                        <></>
                     )}
                  </Grid>
               </Grid>
            </Box>
         </Paper>
      </Box>
   );
}
