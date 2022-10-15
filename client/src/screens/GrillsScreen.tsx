import { Box } from "@mui/system";
import React from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { ListItemButton, ListItemIcon, ListItemText, Tab } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link, Outlet } from "react-router-dom";
import PreviewIcon from "@mui/icons-material/Preview";

const GrillsScreen = () => {
   return (
      <div>
         <Box sx={{ display: "flex" }}>
            <Link to={"/menu/grills/list"} style={{ textDecoration: "none", color: "black" }}>
               <ListItemButton
                  sx={{
                     maxWidth: 200,
                     minHeight: 48,
                     justifyContent: "center",
                     px: 2.5,
                  }}
               >
                  <ListItemIcon
                     sx={{
                        minWidth: 0,
                        mr: "auto",
                        justifyContent: "center",
                     }}
                  >
                     <RemoveRedEyeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Ver todo"} />
               </ListItemButton>
            </Link>
            <Link to={"/menu/grills/import"} style={{ textDecoration: "none", color: "black" }}>
               <ListItemButton
                  sx={{
                     maxWidth: 200,
                     minHeight: 48,
                     justifyContent: "center",
                     px: 2.5,
                  }}
               >
                  <ListItemIcon
                     sx={{
                        minWidth: 0,
                        mr: "auto",
                        justifyContent: "center",
                     }}
                  >
                     <InsertDriveFileIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Importar Parrilla"} />
               </ListItemButton>
            </Link>
            <Link to={"/menu/grills/programmation/last"} style={{ textDecoration: "none", color: "black" }}>
               <ListItemButton
                  sx={{
                     maxWidth: 200,
                     minHeight: 48,
                     justifyContent: "center",
                     px: 2.5,
                  }}
               >
                  <ListItemIcon
                     sx={{
                        minWidth: 0,
                        mr: "auto",
                        justifyContent: "center",
                     }}
                  >
                     <PreviewIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Ver ultima parrilla"} />
               </ListItemButton>
            </Link>
         </Box>
         <Box sx={{ display: "flex", alignContent: "center", justifyContent: "center", pt: 2 }}>
            <Outlet />
         </Box>
      </div>
   );
};

export default GrillsScreen;
