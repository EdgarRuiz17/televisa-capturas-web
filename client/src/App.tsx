import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useContext } from "react";

//views
import Login from "./screens/Login";
import Import from "./screens/Import";
import MiniDrawer from "./components/Drawer";
import GrillsScreen from "./screens/GrillsScreen";
import ReactVirtualizedTable from "./containers/ProgrammationsTable";
import CurrentUserContext, { CurrentUserProvider } from "./context/userContext";
import Error404 from "./screens/404";
import UsersTable from "./containers/UsersTable";
import Calendar from "./containers/ProgramsScheduler";
import { IdleScreen } from "./screens/IldeScreen";

//Compoents

function App() {
   return (
      <section>
         <CurrentUserProvider>
            <InitialRoutes />
         </CurrentUserProvider>
      </section>
   );
}

//routes
const InitialRoutes = () => {
   const { currentUser } = useContext(CurrentUserContext);
   console.log(currentUser);
   return (
      <div>
         <Router>
            {currentUser ? (
               <Routes>
                  <Route path="*" element={<Error404 />} />
                  <Route path="/menu" element={<MiniDrawer />}>
                     <Route path="" element={<IdleScreen />} />
                     <Route path="grills" element={<GrillsScreen />}>
                        <Route path="list" element={<ReactVirtualizedTable />} />
                        <Route path="programmation/last" element={<Calendar />} />
                        <Route path="programmation/:programId" element={<Calendar />} />
                        <Route path="import" element={<Import />} />
                     </Route>
                     {currentUser.tipo_Usuario.administrador ? <Route path="users" element={<UsersTable />} /> : <></>}
                  </Route>
                  <Route path="test" element={<Calendar />} />
               </Routes>
            ) : (
               <Routes>
                  <Route path="/*" element={<Login />} />
               </Routes>
            )}
         </Router>
      </div>
   );
};

export default App;
