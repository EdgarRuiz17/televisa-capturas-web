import { Scheduler } from "@aldabil/react-scheduler";
import { EventActions, ProcessedEvent } from "@aldabil/react-scheduler/types";
import { AlertColor, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
   createNewProgram,
   deleteProgram,
   getLatestProgrammation,
   getProgrammationById,
   modifyProgram,
} from "../backend/backendRequests";
import AlertSnackBar from "../components/AlertSnackbar";
import { useToken } from "../hooks/userTokenHook";

interface Data {
   event_id: string;
   title: string;
   start: Date;
   end: Date;
   tipo_programa: string;
   calidad_programa: string;
   SubName?: string;
}

function createData(
   event_id: string,
   title: string,
   start: any,
   end: any,
   tipo_programa: string,
   calidad_programa: string,
   SubName?: string
): Data {
   console.log("end", end, "start", start);
   let startDate = new Date(start);
   let endDate = new Date(end);
   return {
      event_id,
      title,
      start: startDate,
      end: endDate,
      tipo_programa,
      calidad_programa,
      SubName,
   };
}

const Calendar = () => {
   const token = useToken();
   const [programmationSelected, setProgrammationSelected] = useState("");
   const [programs, setPrograms] = useState<any>([]);
   const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
   const [messageSnackBar, setMessageSnackBar] = useState("");
   const [severitySnackBar, setSeveritySnackBar] = useState<AlertColor>("error");
   const [isLoading, setIsLoading] = useState(true);
   const { programId } = useParams();

   useEffect(() => {
      if (programId) {
         const fetchProgrammationAndProgramsById = async () => {
            const programmationsResponse = await getProgrammationById(token, programId);
            const programmationsResponseData = programmationsResponse.data;
            setPrograms(programmationsResponseData.semana_Programas);
            setProgrammationSelected(programmationsResponseData._id);
            console.log(programmationsResponse);
            setIsLoading(false);
            console.log(new Date("2022-09-27T07:00:00.000Z"));
         };
         fetchProgrammationAndProgramsById();
      } else {
         const fetchLatestProgrammationAndPrograms = async () => {
            const programmationsResponse = await getLatestProgrammation();
            const programmationsResponseData = programmationsResponse.data;
            setPrograms(programmationsResponseData.semana_Programas);
            setProgrammationSelected(programmationsResponseData._id);
            console.log(programmationsResponse);
            setIsLoading(false);
         };
         fetchLatestProgrammationAndPrograms();
      }
   }, [openSnackBar]);

   const events = programs.map((program) => {
      return createData(
         program._id,
         program.programa_Nombre,
         program.hora_Inicio,
         program.hora_Fin,
         program.programa_Tipo,
         program.programa_Calidad
      );
   });

   const handleConfirm = async (event: ProcessedEvent, action: EventActions) => {
      try {
         setIsLoading(true);
         console.log(programmationSelected);
         if (action === "edit") {
            await modifyProgram(
               token,
               event.event_id.toString(),
               event.title,
               event.tipo_programa,
               event.calidad_programa,
               event.start,
               event.end
            );
            setMessageSnackBar("Programa modificado!");
            setSeveritySnackBar("success");
            setOpenSnackBar(true);
            return {
               ...event,
               event_id: event?.event_id || Math.random(),
               title: event.title,
               start: event.start,
               end: event.end,
            };
         } else if (action === "create") {
            console.log(event);
            await createNewProgram(
               token,
               {
                  programa_Nombre: event.title,
                  programa_Calidad: event.calidad_programa,
                  programa_Subnombre: event.SubName,
                  programa_Tipo: event.tipo_programa,
                  hora_Inicio: event.start,
                  hora_Fin: event.end,
               },
               "6358cce4471d70c6d40ec496"
            );
            setMessageSnackBar("Programa creado!");
            setSeveritySnackBar("success");
            setOpenSnackBar(true);
            return {
               ...event,
               event_id: event?.event_id || Math.random(),
               title: event.title,
               start: event.start,
               end: event.end,
            };
         }
      } finally {
         setIsLoading(false);
      }
   };

   const handleDeleteProgram = async (id: string) => {
      await deleteProgram(token, id);
      setMessageSnackBar("Programa eliminado!");
      setSeveritySnackBar("success");
      setOpenSnackBar(true);
   };

   return (
      <>
         {!isLoading ? (
            <Scheduler
               deletable={true}
               view="week"
               events={events}
               onConfirm={handleConfirm}
               onDelete={handleDeleteProgram}
               day={null}
               month={null}
               draggable={false}
               loading={isLoading}
               dialogMaxWidth="md"
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
                  },
                  moreEvents: "Mas...",
               }}
               fields={[
                  {
                     name: "tipo_programa",
                     type: "select",
                     options: [
                        { id: 1, text: "Grabado", value: "Grabado" },
                        { id: 2, text: "Vivo", value: "Vivo" },
                        { id: 3, text: "Repetición", value: "Repetición" },
                        { id: 4, text: "Local", value: "Local" },
                     ],
                     config: { label: "Tipo de programa", required: true, errMsg: "Selecciona un tipo" },
                  },
                  {
                     name: "calidad_programa",
                     type: "select",
                     options: [
                        { id: 1, text: "A/HD", value: "A/HD" },
                        { id: 2, text: "C/HD", value: "C/HD" },
                        { id: 3, text: "B-15/HD", value: "B-15/HD" },
                        { id: 4, text: "B/HD", value: "B/HD" },
                        { id: 3, text: "A/SD", value: "A/SD" },
                        { id: 4, text: "B/SD", value: "B/SD" },
                     ],
                     config: { label: "Calidad del programa", required: true, errMsg: "Selecciona una calidad" },
                  },
                  {
                     name: "SubName",
                     type: "input",
                     default: "",
                     config: { label: "Nombre secundario" },
                  },
               ]}
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
