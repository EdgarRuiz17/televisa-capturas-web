import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

//views
import Login from "./views/Login";
import Import from "./views/Import";
import MiniDrawer from "./components/Drawer";
import GrillsScreen from "./views/GrillsScreen";
import ReactVirtualizedTable from "./containers/GrillsTable"
import ProgramsGrid from "./containers/ProgramsGrid";

//Compoents

function App() {
   return (
      <section>
         <InitialRoutes />
      </section>
   );
}

//routes
const InitialRoutes = () => {
   return (
      <div>
         <Router>
            <Routes>
               <Route path="/" element={<Login />} />
               <Route path="*" element={<Login />} />
               <Route path="/menu" element={<MiniDrawer/>}>
                  <Route path="grills" element={<GrillsScreen />} >
                     <Route path="list" element={<ReactVirtualizedTable />} />
                     <Route path="programmation" element={<ProgramsGrid />} />
                     <Route path="import" element={<Import />} />
                  </Route>
               </Route>
            </Routes>
         </Router>
      </div>
   );
};

export default App;
