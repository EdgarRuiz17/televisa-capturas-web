import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import DialogActions from "@mui/material/DialogActions/DialogActions";

interface GrillsModalProps {
   open: boolean;
   setOpen: Function;

   programmation: any;
   setProgrammation: Function;

   idModify: boolean;

   onConfirm: Function;

   onCancel?: () => {};
}

export default function GrillsModal(props: GrillsModalProps) {
   const handleClose = () => props.setOpen(false);

   const handleChange = (value: any, name: string) => {
      props.setProgrammation((prev) => {
         return {
            ...prev,
            [name]: value,
         };
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
               }}
            >
               <Typography sx={{ p: 2 }}> Modificar programación</Typography>
               <Box sx={{ p: 2, display: "flex" }}>
                  <TextField
                     id="date"
                     label="Fecha de inicio"
                     type="date"
                     value={props.programmation.semana_inicio}
                     onChange={(e) => handleChange(e.target.value, "semana_inicio")}
                     sx={{ mr: 1 }}
                     variant="standard"
                     InputLabelProps={{
                        shrink: true,
                     }}
                     fullWidth
                  />
                  <TextField
                     id="date"
                     label="Fecha de fin"
                     type="date"
                     value={props.programmation.semana_fin}
                     onChange={(e) => handleChange(e.target.value, "semana_fin")}
                     sx={{ ml: 1 }}
                     variant="standard"
                     InputLabelProps={{
                        shrink: true,
                     }}
                     fullWidth
                  />
               </Box>
               <DialogActions>
                  <Button onClick={() => handleClose()}>Cancelar</Button>
                  <Button onClick={() => props.onConfirm()}>Confirmar</Button>
               </DialogActions>
            </Box>
         </Modal>
      </div>
   );
}
