import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
   position: "absolute" as "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: 400,
   bgcolor: "background.paper",
   borderRadius: 2,
   boxShadow: 24,
   p: 4,
};

interface TokenExpiredModalProps {
   open: boolean;
   setOpen: Function;
}

export default function TokenExpiredModal(props: TokenExpiredModalProps) {
   const handleClose = () => {
      props.setOpen(false);
   };

   return (
      <div>
         <Modal open={props.open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  Su sesión a expirado
               </Typography>
               <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Favor de volver a introducir sus credenciales.
               </Typography>
               <Box sx={{ display: "flex", alignContent: "flex-end", pt: 2 }}>
                  <Button variant="outlined" onClick={handleClose}>
                     Cerrar
                  </Button>
               </Box>
            </Box>
         </Modal>
      </div>
   );
}
