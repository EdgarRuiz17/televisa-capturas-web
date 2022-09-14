import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React from "react";

//views
import Login from "./views/Login";
import Prueba from "./views/prueba";

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
          <Route path="/" element={<Prueba />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;