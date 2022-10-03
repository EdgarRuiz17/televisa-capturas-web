import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import dayjs, { Dayjs } from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Divider, Grid, MenuItem, Paper, Select, TextField } from "@mui/material";

interface UsersModalProps {
   open: boolean;
   setOpen: Function;

   isModify: boolean;

   onConfirm: () => void;
   onCancel?: () => void;
}

const Types = ["Administrador", "Usuario Web", "Usuario de Escritorio"];

export default function UsersModal(props: UsersModalProps) {
   const [programData, setProgramData] = React.useState<any>({
      type: "Grabado",
      quality: "A/HD",
      startTime: dayjs("2014-08-18T21:11:54"),
      finishTime: dayjs("2014-08-18T21:11:54"),
   });
   const handleClose = () => props.setOpen(false);

   const handleChangeType = (event: any) => {
      const { name, value } = event.target;

      setProgramData({
         ...programData,
         [name]: value,
      });
   };

   const handleChangeTime = (event: Dayjs | null) => {
      setProgramData({
         ...programData,
         startTime: event,
      });
   };

   return (
      <div>
         <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box
               sx={{
                  bgcolor: "white",
                  boxShadow: 24,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  borderRadius: 2,
                  width: "600px",
                  height: "400px",
                  textAlign: "center",
               }}
            >
               <Typography id="modal-modal-title" variant="h6" sx={{ m: 2 }}>
                  {props.isModify ? "Modificar Usuario" : "Crear Usuario"}
               </Typography>
               <Divider />
               <Grid container spacing={2}>
                  <Grid xs={12} item container sx={{ pt: 1, m: 2 }}>
                     <Grid xs={4}>
                        <Typography id="modal-modal-title">Nombre de usuario:</Typography>
                     </Grid>
                     <Grid xs={8}>
                        <TextField size="small" />
                     </Grid>
                  </Grid>
                  <Grid xs={12} item container sx={{ m: 2 }}>
                     <Grid xs={4}>
                        <Typography id="modal-modal-title">Contraseña del usuario:</Typography>
                     </Grid>
                     <Grid xs={8}>
                        <TextField size="small" type="password" />
                     </Grid>
                  </Grid>
                  <Grid item container xs={12} sx={{ m: 2 }}>
                     <Grid item xs={4}>
                        <Typography id="modal-modal-title">Tipo de usuario:</Typography>
                     </Grid>
                     <Grid item xs={8}>
                        <Select
                           size="small"
                           id="type"
                           name="type"
                           value={programData.type}
                           onChange={(e) => handleChangeType(e)}
                           sx={{ width: "220px" }}
                        >
                           {Types.map((type) => {
                              return <MenuItem value={type}>{type}</MenuItem>;
                           })}
                        </Select>
                     </Grid>
                  </Grid>
               </Grid>
               <Divider />
               <Grid sx={{ textAlign: "center" }}>
                  <Button sx={{ height: "50px", bgcolor: "whitesmoke" }} variant="outlined">
                     {props.isModify ? "Modificar" : "Crear"}
                  </Button>
                  <Button sx={{ height: "50px", m: 2, borderColor: "red" }} variant="outlined">
                     Cancelar
                  </Button>
               </Grid>
            </Box>
         </Modal>
      </div>
   );
}
