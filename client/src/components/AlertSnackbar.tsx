import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackBarProps {
   open: boolean;
   setOpen: Function;
   message: string;
   severity: AlertColor;
}

export default function AlertSnackBar(props: SnackBarProps) {
   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
         return;
      }

      props.setOpen(false);
   };

   return (
      <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
         <Alert onClose={handleClose} severity={props.severity} sx={{ width: "100%" }}>
            {props.message}
         </Alert>
      </Snackbar>
   );
}
