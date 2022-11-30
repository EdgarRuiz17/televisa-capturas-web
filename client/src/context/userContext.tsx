import * as React from "react";
import { VerifyAuthUser } from "../libs/backendRequests";

export type UserType = {
   nombre_Usuario: string;
   contrasena_Usuario: string;
   tipo_Usuario: any;
};

export type UserContext = {
   currentUser: UserType;
   setCurrentUser: (user: UserType) => void;
   tokenValidation: boolean;
   checkLogin: () => void;
   setAuthIsLoading: (isLoading: boolean) => void;
   authIsLoading: boolean;
   handleLogout: () => void;
   openExpiredModal: boolean;
   setOpenExpiredModal: (open: boolean) => void;
   setTokenValidation: (validation: boolean) => void;
};
const CurrentUserContext = React.createContext<UserContext>(null);

export default CurrentUserContext;

type ProviderProps = {
   children: React.ReactNode;
};

export const CurrentUserProvider = ({ children }: ProviderProps) => {
   const [currentUser, setCurrentUser] = React.useState<UserType | null>(null);
   const [authIsLoading, setAuthIsLoading] = React.useState(false);
   const [tokenValidation, setTokenValidation] = React.useState(true);
   const [openExpiredModal, setOpenExpiredModal] = React.useState(false);

   React.useEffect(() => {
      checkLogin();
   }, []);

   const checkLogin = async () => {
      const token = localStorage.getItem("token");
      console.log("CHECKING LOGIN");

      if (token) {
         const User = await VerifyAuthUser(token);
         console.log(User);
         setTokenValidation(User.data.valido);
         if (User.data.valido) {
            setOpenExpiredModal(false);
         } else {
            setOpenExpiredModal(true);
         }
         setCurrentUser(User.data.user_data);
      }

      setAuthIsLoading(false);
   };

   const handleLogout = async () => {
      localStorage.removeItem("token");
      setCurrentUser(null);
   };

   const stateValues = {
      currentUser,
      setCurrentUser,
      tokenValidation,
      setTokenValidation,
      checkLogin,
      setAuthIsLoading,
      openExpiredModal,
      setOpenExpiredModal,
      authIsLoading,
      handleLogout,
   };

   return <CurrentUserContext.Provider value={stateValues}>{children}</CurrentUserContext.Provider>;
};
