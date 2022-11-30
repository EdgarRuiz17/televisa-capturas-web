import {
   AlertColor,
   Box,
   Button,
   CircularProgress,
   DialogActions,
   TextField,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
} from "@mui/material";
import {
   createNewProgram,
   deleteProgram,
   getLatestProgrammation,
   getProgrammationById,
   modifyProgram,
} from "../libs/backendRequests";
import AlertSnackBar from "../components/AlertSnackbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Scheduler } from "@aldabil/react-scheduler";
import { ProcessedEvent, SchedulerHelpers } from "@aldabil/react-scheduler/types";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { useToken } from "../hooks/userTokenHook";

interface Data {
   event_id: string;
   title: string;
   start: Date;
   end: Date;
   tipo_programa: string;
   calidad_programa: string;
   subName?: string;
}

function createData(
   event_id: string,
   title: string,
   start: any,
   end: any,
   tipo_programa: string,
   calidad_programa: string,
   subName?: string
): Data {
   let startDate = new Date(start);
   let endDate = new Date(end);
   return {
      event_id,
      title,
      start: startDate,
      end: endDate,
      tipo_programa,
      calidad_programa,
      subName,
   };
}

const Calendar = () => {
   const token = useToken();
   const [programmationSelected, setProgrammationSelected] = useState({
      semana_Inicio: new Date(),
      semana_Fin: "",
      _id: "",
   });
   const [programs, setPrograms] = useState<any>([]);
   const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
   const [messageSnackBar, setMessageSnackBar] = useState("");
   const [severitySnackBar, setSeveritySnackBar] = useState<AlertColor>("error");
   const [isLoading, setIsLoading] = useState(true);
   const { programId } = useParams();
   const [startDate, setStartDate] = useState<Date>();

   useEffect(() => {
      if (programId) {
         const fetchProgrammationAndProgramsById = async () => {
            const programmationsResponse = await getProgrammationById(token, programId);
            const programmationsResponseData = programmationsResponse.data;
            setPrograms(programmationsResponseData.semana_Programas);
            setProgrammationSelected(programmationsResponseData);
            const date = new Date(programmationsResponseData.semana_Inicio);
            const result = subtractMonths(1, date);
            setStartDate(result);
            setIsLoading(false);
         };
         fetchProgrammationAndProgramsById();
      } else {
         const fetchLatestProgrammationAndPrograms = async () => {
            const programmationsResponse = await getLatestProgrammation();
            const programmationsResponseData = programmationsResponse.data;
            setPrograms(programmationsResponseData.semana_Programas);
            setProgrammationSelected(programmationsResponseData);
            const date = new Date(programmationsResponseData.semana_Inicio);
            const result = subtractMonths(1, date);
            setStartDate(result);
            setIsLoading(false);
         };
         fetchLatestProgrammationAndPrograms();
      }
   }, [programId, token]);

   function subtractMonths(numOfMonths: number, date = new Date()) {
      const dateCopy = new Date(date.getTime());

      dateCopy.setMonth(dateCopy.getMonth() - numOfMonths);

      return dateCopy;
   }

   const events = programs.map((program) => {
      return createData(
         program._id,
         program.programa_Nombre,
         program.hora_Inicio,
         program.hora_Fin,
         program.programa_Tipo,
         program.programa_Calidad,
         program.programa_Subnombre
      );
   });

   const handleDeleteProgram = async (id: string) => {
      await deleteProgram(token, id);
      setMessageSnackBar("Programa eliminado!");
      setSeveritySnackBar("success");
      setOpenSnackBar(true);
   };

   interface CustomEditorProps {
      scheduler: SchedulerHelpers;
   }
   const CustomEditor = ({ scheduler }: CustomEditorProps) => {
      const event = scheduler.edited;

      const [startDate, setStartDate] = useState(
         format(event ? event.start : scheduler.state.start.value, "yyyy-MM-dd HH:mm")
      );
      const [endDate, setEndDate] = useState(format(event ? event.end : scheduler.state.end.value, "yyyy-MM-dd HH:mm"));

      const [state, setState] = useState({
         title: event?.title || "",
         calidad_programa: event?.calidad_programa || "",
         subName: event?.subName || "",
         tipo_programa: event?.tipo_programa || "",
      });
      const [error, setError] = useState(null);

      const handleChange = (value: any, name: string) => {
         setState((prev) => {
            return {
               ...prev,
               [name]: value,
            };
         });
      };

      const handleChangeDate = (value: any, name: string) => {
         if (name === "start") {
            setStartDate(value);
         } else {
            setEndDate(value);
         }
      };

      const handleSubmit = async () => {
         if (state.title.length < 3) {
            return setError({ ...error, title: "Min 3 letters" });
         }

         try {
            scheduler.loading(true);
            if (scheduler.edited) {
               await modifyProgram(
                  token,
                  event.event_id.toString(),
                  state.title,
                  state.subName,
                  state.tipo_programa,
                  state.calidad_programa,
                  new Date(startDate),
                  new Date(endDate)
               );
               setMessageSnackBar("Programa modificado!");
               setSeveritySnackBar("success");
               setOpenSnackBar(true);
            } else {
               await createNewProgram(
                  token,
                  {
                     programa_Nombre: state.title,
                     programa_Calidad: state.calidad_programa,
                     programa_Subnombre: state.subName,
                     programa_Tipo: state.tipo_programa,
                     hora_Inicio: new Date(startDate),
                     hora_Fin: new Date(endDate),
                  },
                  programmationSelected._id
               );
               setMessageSnackBar("Programa creado!");
               setSeveritySnackBar("success");
               setOpenSnackBar(true);
            }
            const added_updated_event = (await new Promise((res) => {
               setTimeout(() => {
                  res({
                     event_id: event?.event_id || Math.random(),
                     title: state.title,
                     start: new Date(startDate),
                     end: new Date(endDate),
                     description: state.calidad_programa,
                     subName: state.subName,
                  });
               }, 1000);
            })) as ProcessedEvent;

            scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
            scheduler.close();
         } finally {
            scheduler.loading(false);
         }
      };
      return (
         <div>
            <div style={{ padding: "1rem", minWidth: 600 }}>
               <p>Modificar programa</p>
               <Box sx={{ p: 2 }}>
                  <TextField
                     label="Nombre del programa"
                     value={state.title}
                     onChange={(e) => handleChange(e.target.value, "title")}
                     error={!!error}
                     helperText={!!error && error["title"]}
                     fullWidth
                     variant="standard"
                  />
               </Box>
               <Box sx={{ p: 2 }}>
                  <TextField
                     label="Nombre secundario del programa"
                     value={state.subName}
                     onChange={(e) => handleChange(e.target.value, "subName")}
                     error={!!error}
                     helperText={!!error && error["title"]}
                     fullWidth
                     variant="standard"
                  />
               </Box>
               <Box sx={{ p: 2 }}>
                  <FormControl variant="standard" fullWidth>
                     <InputLabel id="demo-simple-select-standard-label">Calidad del programa</InputLabel>
                     <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={state.calidad_programa}
                        onChange={(e) => handleChange(e.target.value, "calidad_programa")}
                        label="Calidad del programa"
                     >
                        <MenuItem value={"GRABADO"}>Grabado</MenuItem>
                        <MenuItem value={"VIVO"}>Vivo</MenuItem>
                        <MenuItem value={"REPETICIÓN"}>Repetición</MenuItem>
                        <MenuItem value={"LOCAL"}>Local</MenuItem>
                     </Select>
                  </FormControl>
               </Box>
               <Box sx={{ p: 2 }}>
                  <FormControl variant="standard" fullWidth>
                     <InputLabel id="demo-simple-select-standard-label">Tipo del programa</InputLabel>
                     <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={state.tipo_programa}
                        onChange={(e) => handleChange(e.target.value, "tipo_programa")}
                        label="Tipo del programa"
                     >
                        <MenuItem value={"A/HD"}>A/HD</MenuItem>
                        <MenuItem value={"C/HD"}>C/HD</MenuItem>
                        <MenuItem value={"B-15/HD"}>B-15/HD</MenuItem>
                        <MenuItem value={"B/HD"}>B/HD</MenuItem>
                        <MenuItem value={"A/SD"}>A/SD</MenuItem>
                        <MenuItem value={"B/SD"}>B/SD</MenuItem>
                     </Select>
                  </FormControl>
               </Box>
               <Box sx={{ p: 2, display: "flex" }}>
                  <TextField
                     id="datetime-local"
                     label="Fecha de inicio"
                     type="datetime-local"
                     value={startDate}
                     onChange={(e) => handleChangeDate(e.target.value, "start")}
                     sx={{ mr: 1 }}
                     variant="standard"
                     InputLabelProps={{
                        shrink: true,
                     }}
                     fullWidth
                  />
                  <TextField
                     id="datetime-local"
                     label="Fecha de fin"
                     type="datetime-local"
                     value={endDate}
                     onChange={(e) => handleChangeDate(e.target.value, "end")}
                     sx={{ ml: 1 }}
                     variant="standard"
                     InputLabelProps={{
                        shrink: true,
                     }}
                     fullWidth
                  />
               </Box>
            </div>
            <DialogActions>
               <Button onClick={scheduler.close}>Cancelar</Button>
               <Button onClick={handleSubmit}>Confirmar</Button>
            </DialogActions>
         </div>
      );
   };

   return (
      <>
         {!isLoading ? (
            <Scheduler
               deletable={true}
               view="week"
               events={events}
               onDelete={handleDeleteProgram}
               selectedDate={startDate}
               customEditor={(scheduler) => <CustomEditor scheduler={scheduler} />}
               day={null}
               month={null}
               draggable={false}
               loading={isLoading}
               dialogMaxWidth="md"
               locale={es}
               week={{
                  weekDays: [0, 1, 2, 3, 4, 5, 6],
                  startHour: 0,
                  endHour: 23,
                  weekStartOn: 1,
                  step: 60,
               }}
               translations={{
                  navigation: {
                     month: "Mes",
                     week: "Semana",
                     day: "Día",
                     today: "Hoy",
                  },
                  form: {
                     addTitle: "Agregar programa",
                     editTitle: "Editar programa",
                     confirm: "Confirmar",
                     delete: "Borrar",
                     cancel: "Cancelar",
                  },
                  event: {
                     title: "Nombre de programa",
                     start: "Inicio",
                     end: "Final",
                     allDay: "Todo el día",
                  },
                  moreEvents: "Mas...",
               }}
            />
         ) : (
            <Box sx={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
               <CircularProgress />
            </Box>
         )}
         <AlertSnackBar
            open={openSnackBar}
            setOpen={setOpenSnackBar}
            message={messageSnackBar}
            severity={severitySnackBar}
         />
      </>
   );
};

export default Calendar;
