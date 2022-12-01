import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/material";

interface SimpleDialogProps {
   open: boolean;
   setOpen: Function;
   // Data
   head: string;
   message: string;
   //Functions
   onConfirm: () => void;
}

export default function AlertDialog(props: SimpleDialogProps) {
   const handleClose = () => {
      props.setOpen(false);
   };

   return (
      <div>
         <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            <DialogTitle id="alert-dialog-title">{props.head}</DialogTitle>
            <Divider />
            <DialogContent>
               <DialogContentText id="alert-dialog-description">{props.message}</DialogContentText>
            </DialogContent>
            <Divider />
            <DialogActions>
               <Button onClick={handleClose}>Cancelar</Button>
               <Button onClick={props.onConfirm} autoFocus>
                  Aceptar
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}
