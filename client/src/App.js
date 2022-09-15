import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React from "react";

//views
import Login from "./views/Login";
import Import from "./views/Import";

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
          <Route path="/home" element={<Import />} />
          <Route path="/admin" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;