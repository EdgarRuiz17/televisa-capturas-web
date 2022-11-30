import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InfoIcon from "@mui/icons-material/Info";
import {
   Divider,
   FormControl,
   FormHelperText,
   Grid,
   IconButton,
   InputAdornment,
   InputLabel,
   MenuItem,
   OutlinedInput,
   Select,
   Tooltip,
} from "@mui/material";

interface UsersModalProps {
   open: boolean;
   setOpen: Function;

   userInformation: any;
   setUserInformation: Function;

   errors: any;
   setErrors: Function;

   isModify: boolean;

   onConfirm: () => void;
   onCancel?: () => void;
}

const Types = ["Administrador", "Usuario Web", "Usuario de escritorio"];

export default function UsersModal(props: UsersModalProps) {
   const expressions = {
      user_name: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
   };

   const handleClose = () => props.setOpen(false);

   const handleChangeData = (event: any) => {
      const { name, value } = event.target;

      if (value === "") {
         props.setErrors({
            ...props.errors,
            [name]: {
               error: true,
               message: "Favor de llenar el campo",
            },
         });
      } else {
         props.setErrors({
            ...props.errors,
            [name]: {
               error: false,
               message: "",
            },
         });
      }

      if (name === "contrasena_Usuario" && !expressions.password.test(value)) {
         props.setErrors({
            ...props.errors,
            [name]: {
               error: true,
               message: "Contraseña muy debíl.",
            },
         });
      } else if (name === "nombre_Usuario" && !expressions.user_name.test(value)) {
         props.setErrors({
            ...props.errors,
            [name]: {
               error: true,
               message: "Nombre de usuario incorrecto.",
            },
         });
      }

      props.setUserInformation({
         ...props.userInformation,
         [name]: value,
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
                  maxWidth: "650px",
                  height: "auto",
                  textAlign: "center",
               }}
            >
               <Typography id="modal-modal-title" variant="h6" sx={{ m: 2 }}>
                  {props.isModify ? "Modificar Usuario" : "Crear Usuario"}
               </Typography>
               <Divider />
               <Grid item container>
                  <Grid xs={12} item sx={{ m: 3 }}>
                     <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Nombre de usuario</InputLabel>
                        <OutlinedInput
                           id="outlined-adornment-password"
                           name="nombre_Usuario"
                           type="text"
                           value={props.userInformation.nombre_Usuario}
                           onChange={handleChangeData}
                           error={props.errors.nombre_Usuario.error}
                           endAdornment={
                              <InputAdornment position="end">
                                 <Tooltip
                                    title="El nombre de usuario debe contener al menos 1 mayúscula, 1 minúscula y 1 número. 
                                             Mínimo se requiere una longitud de 8 caracteres."
                                    placement="top-start"
                                 >
                                    <IconButton aria-label="toggle password visibility" edge="end">
                                       <InfoIcon />
                                    </IconButton>
                                 </Tooltip>
                              </InputAdornment>
                           }
                           label="Nombre de usuario"
                        />
                        <FormHelperText>
                           {props.errors.nombre_Usuario.error ? props.errors.nombre_Usuario.message : ""}
                        </FormHelperText>
                     </FormControl>
                  </Grid>
                  <Grid xs={12} item sx={{ m: 3 }}>
                     <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                           id="outlined-adornment-password"
                           name="contrasena_Usuario"
                           type="password"
                           value={props.userInformation.contrasena_Usuario}
                           onChange={handleChangeData}
                           error={props.errors.contrasena_Usuario.error}
                           endAdornment={
                              <InputAdornment position="end">
                                 <Tooltip
                                    title="La contraseña debe contener al menos 1 mayúscula, 1 minúscula, 1 número y algún símbolo. 
                                             Mínimo se requiere una longitud de 8 caracteres."
                                    placement="top-start"
                                 >
                                    <IconButton aria-label="toggle password visibility" edge="end">
                                       <InfoIcon />
                                    </IconButton>
                                 </Tooltip>
                              </InputAdornment>
                           }
                           label="Contraseña"
                        />
                        <FormHelperText>
                           {props.errors.contrasena_Usuario.error ? props.errors.contrasena_Usuario.message : ""}
                        </FormHelperText>
                     </FormControl>
                  </Grid>
                  <Grid item xs={12} sx={{ m: 3 }}>
                     <FormControl fullWidth sx={{ textAlign: "left" }}>
                        <InputLabel id="demo-simple-select-label">Tipo de usuario</InputLabel>
                        <Select
                           labelId="demo-simple-select-label"
                           id="type"
                           name="tipo_Usuario"
                           value={props.userInformation.tipo_Usuario}
                           onChange={(e) => handleChangeData(e)}
                           label="Tipo de usuario"
                        >
                           {Types.map((type) => {
                              return <MenuItem value={type}>{type}</MenuItem>;
                           })}
                        </Select>
                     </FormControl>
                  </Grid>
               </Grid>
               <Divider />
               <Grid sx={{ textAlign: "center" }}>
                  <Button sx={{ height: "50px", bgcolor: "whitesmoke" }} variant="outlined" onClick={props.onConfirm}>
                     {props.isModify ? "Modificar" : "Crear"}
                  </Button>
                  <Button
                     sx={{ height: "50px", m: 2, borderColor: "red" }}
                     variant="outlined"
                     onClick={() => props.setOpen(false)}
                  >
                     Cancelar
                  </Button>
               </Grid>
            </Box>
         </Modal>
      </div>
   );
}
