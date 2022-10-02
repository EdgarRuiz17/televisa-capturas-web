import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useContext } from "react";

//views
import Login from "./screens/Login";
import Import from "./screens/Import";
import MiniDrawer from "./components/Drawer";
import GrillsScreen from "./screens/GrillsScreen";
import ReactVirtualizedTable from "./containers/GrillsTable";
import ProgramsGrid from "./containers/ProgramsGrid";
import CurrentUserContext, { CurrentUserProvider } from "./context/userContext";

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
                  <Route path="/" element={<Login />} />
                  <Route path="*" element={<Login />} />
                  <Route path="/menu" element={<MiniDrawer />}>
                     <Route path="grills" element={<GrillsScreen />}>
                        <Route path="list" element={<ReactVirtualizedTable />} />
                        <Route path="programmation" element={<ProgramsGrid />} />
                        <Route path="import" element={<Import />} />
                     </Route>
                  </Route>
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
