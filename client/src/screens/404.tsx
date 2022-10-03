import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const error = require("../assets/404.png");

const Error404 = () => {
   return (
      <Box sx={{ position: "absolute", top: "35%", right: "35%" }}>
         <img src={error} alt="Error 404" />
         Esta página no existe, desea volver a la página principal?
         <Grid sx={{ textAlign: "center" }}>
            <Link to={"/menu"} style={{ textDecoration: "none" }}>
               <Button color="primary" variant={"outlined"}>
                  Regresar
               </Button>
            </Link>
         </Grid>
      </Box>
   );
};

export default Error404;
