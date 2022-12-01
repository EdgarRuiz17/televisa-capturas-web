import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//styled components
import { ErrorMessage } from "../styles/FormStyles";
import Input from "../components/FormInput";
import CurrentUserContext from "../context/userContext";
import { AuthUser } from "../libs/backendRequests";
import TokenExpiredModal from "../components/TokenExpiredModal";

const Logo = require("../assets/logo-televisa.png");

export default function Login() {
   const navigate = useNavigate();
   const { setCurrentUser, setTokenValidation, openExpiredModal, setOpenExpiredModal } =
      React.useContext(CurrentUserContext);

   const [nombre_Usuario, setUsuario] = useState<any>({
      value: "",
      flag: "",
   });

   const [contrasena_Usuario, setContrasena] = useState<any>({
      value: "",
      flag: "",
   });

   const [errorValidar, setError] = useState<string>("");

   const expression = {
      name: /^[a-zA-Z0-9À-ÿ\s]{8,20}$/, // Letters, Numbers and spaces. Min 4 characters and max 20.
      number: /^[1-9]\d{0,7}(?:\.\d{1,4})?$/, // 1 to 7 numbers, can add decimals.
      sku: /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i, // Numbers and letters, minimum 1 letter and 1 digit.
      brand: /^[a-zA-Z0-9À-ÿ\s]{2,16}$/, // Letters, numbers and spaces. Min 2 characters and max 16
      onlynumber: /^([0-9]{1,5})$/, // Only numbers, min 1 and 5 max
      onlyletters: /^([a-zA-Z]{3,10})$/, // Only letters, min 3 and 10 max
   };

   const validar = async () => {
      if (nombre_Usuario.flag === "true" && contrasena_Usuario.flag === "true") {
         const userAuthResponse = await AuthUser(nombre_Usuario.value, contrasena_Usuario.value);
         if (userAuthResponse) {
            console.log(userAuthResponse);
            const permisos = userAuthResponse.data.tipo_Usuario;
            const token = userAuthResponse.data.token;
            localStorage.setItem("token", token);
            setCurrentUser({
               nombre_Usuario: nombre_Usuario.value,
               contrasena_Usuario: contrasena_Usuario.value,
               tipo_Usuario: permisos,
            });
            setTokenValidation(true);
            if (permisos.administrador) {
               navigate("/menu");
            } else if (permisos.usuario) {
               setError("ESTE USUARIO NO PUEDE ACCEDER A ESTE SISTEMA.");
            } else if (permisos.usuario_web) {
               localStorage.setItem("Token", token);
               console.log(token);
               navigate("/menu");
            }
         }
      }
   };

   return (
      <div className="container">
         <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-auto">
               <div className="text-center">
                  <img className="mb-4" src={Logo} alt="" width="150" height="120" />
               </div>

               <h1 className="h3 mb-3 fw-normal">Favor de ingresar credenciales.</h1>
               <div className="form-floating" style={{ width: "440px" }}>
                  <Input
                     state={nombre_Usuario}
                     changeState={setUsuario}
                     label="Usuario:"
                     placeholder="Usuario"
                     name="usuario"
                     type="text"
                     error="Se requiere minimo 8 caracteres."
                     regularExpresion={expression.name}
                  />
               </div>
               <div className="form-floating" style={{ width: "440px" }}>
                  <Input
                     state={contrasena_Usuario}
                     changeState={setContrasena}
                     label="Contraseña:"
                     placeholder="Contraseña"
                     name="contraseña"
                     type="password"
                     error="Se requiere minimo 8 caracteres."
                     regularExpresion={expression.name}
                  />
               </div>
               {errorValidar !== "" ? (
                  <ErrorMessage>
                     <b>{errorValidar}</b>
                  </ErrorMessage>
               ) : (
                  ""
               )}
               <button className="w-100 btn btn-lg btn-primary mt-3" type="submit" onClick={validar}>
                  Ingresar
               </button>
               <p className="mt-5 mb-3 text-muted">Televisa Sonora &copy; 2022</p>
            </div>
         </div>
         <TokenExpiredModal open={openExpiredModal} setOpen={setOpenExpiredModal} />
      </div>
   );
}
