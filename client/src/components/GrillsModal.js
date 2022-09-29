import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Divider, Grid, MenuItem, Paper, Select, TextField } from "@mui/material";

const Types = ["Grabado", "Vivo", "Repetición", "Local"];
const Quality = ["A/HD", "C/HD", "B-15/HD", "B/HD", "A/SD", "B/SD"];

export default function GrillsModal(props) {
   const [programData, setProgramData] = React.useState({
      type: "Grabado",
      quality: "A/HD",
      startTime: dayjs("2014-08-18T21:11:54"),
      finishTime: dayjs("2014-08-18T21:11:54"),
   });
   const handleClose = () => props.setOpen(false);

   const handleChangeType = (event) => {
      const { name, value } = event.target;

      setProgramData({
         ...programData,
         [name]: value,
      });
   };

   const handleChangeTime = (event) => {
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
                  width: "500px",
                  height: "530px",
                  textAlign: "center"
                  
               }}
            >
               <Typography id="modal-modal-title" variant="h6" sx={{m:2}}>
                  Modificar programa 
               </Typography>
               <Divider />
               <Grid xs={12} item container sx={{ pt: 1, m:3 }} variant="row">
                  <Grid xs={4}>
                     <Typography id="modal-modal-title" variant="h7">
                        Nombre del programa:
                     </Typography>
                  </Grid>
                  <Grid xs={8}>
                     <TextField size="small" />
                  </Grid>
               </Grid>
               <Grid xs={12} item container sx={{ m:3 }}  variant="row">
                  <Grid xs={4}>
                     <Typography id="modal-modal-title" variant="h7">
                        Tipo de programa:
                     </Typography>
                  </Grid>
                  <Grid xs={8}>
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
               <Grid xs={12} item container sx={{ m:3 }} variant="row">
                  <Grid xs={4}>
                     <Typography id="modal-modal-title" variant="h7">
                        Calidad de programa:
                     </Typography>
                  </Grid>
                  <Grid xs={8}>
                     <Select
                        size="small"
                        id="quality"
                        name="quality"
                        value={programData.quality}
                        onChange={(e) => handleChangeType(e)}
                        sx={{ width: "220px" }}
                     >
                        {Quality.map((Q) => {
                           return <MenuItem value={Q}>{Q}</MenuItem>;
                        })}
                     </Select>
                  </Grid>
               </Grid>
               <Grid xs={12} item container sx={{ m:3 }} variant="row">
                  <Grid xs={4}>
                     <Typography id="modal-modal-title" variant="h7">
                        Hora inicial
                     </Typography>
                  </Grid>
                  <Grid xs={8}>
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                           value={programData.startTime}
                           onChange={(e) => handleChangeTime(e)}
                           renderInput={(params) => <TextField {...params} />}
                        />
                     </LocalizationProvider>
                  </Grid>
               </Grid>
               <Grid xs={12} item container sx={{ m:3 }} variant="row">
                  <Grid xs={4}>
                     <Typography id="modal-modal-title" variant="h7">
                        Hora Final
                     </Typography>
                  </Grid>
                  <Grid xs={8}>
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                           value={programData.finishTime}
                           onChange={(e) => handleChangeTime(e)}
                           renderInput={(params) => <TextField {...params} />}
                        />
                     </LocalizationProvider>
                  </Grid>
               </Grid>
               <Divider />
               <Grid sx={{ textAlign:"center"}} >
                    <Button sx={{height:"50px", bgcolor:"whitesmoke", }}>
                        Modificar
                    </Button>
                    <Button sx={{height:"50px", m:2, bgcolor:"black", color: "white" }}>
                        Cancelar
                    </Button>
               </Grid>
            </Box>
         </Modal>
      </div>
   );
}
