import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { deleteUserById, getAllProgrammations, getAllUsers } from "../backend/backendRequests";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PreviewIcon from "@mui/icons-material/Preview";
import { Button, Typography } from "@mui/material";
import GrillsModal from "../components/GrillsModal";
import AlertDialog from "../components/AlertDialog";
import { useToken } from "../hooks/userTokenHook";
import Box from "@mui/material/Box";
import UsersModal from "../components/UsersModal";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AlertSnackBar from "../components/AlertSnackbar";
import { AlertColor } from "@mui/lab";

interface Data {
   nombre_Usuario: string;
   contrasena_Usuario: string;
   tipo_Usuario: any;
   _id: string;
}

const columns = [
   { id: "nombre_Usuario", label: "Nombre de usuario", minWidth: 30 },
   { id: "tipo_Usuario", label: "Tipo de usuario", minWidth: 30 },
   { id: "modify", label: "Modificar", minWidth: 30 },
   { id: "delette", label: "Eliminar", minWidth: 30 },
];

function createData(nombre_Usuario: string, contrasena_Usuario: string, tipo_Usuario: any, _id: string): Data {
   return {
      nombre_Usuario,
      contrasena_Usuario,
      tipo_Usuario,
      _id,
   };
}

export default function UsersTable() {
   const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);
   const [openModifyModal, setOpenModifyModal] = React.useState(false);
   const [openCreateModal, setOpenCreateModal] = React.useState(false);
   const [openSnackBar, setOpenSnackBar] = React.useState(false);
   const [messageSnackBar, setMessageSnackBar] = React.useState("");
   const [severitySnackBar, setSeveritySnackBar] = React.useState<AlertColor>("error");
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(5);
   const [users, setAllUsers] = React.useState([]);
   const [user, setUser] = React.useState<Data>({
      _id: "",
      nombre_Usuario: "",
      contrasena_Usuario: "",
      tipo_Usuario: "",
   });
   const token = useToken();

   const rows = users.map((user: any) => {
      let tipo = "";
      if (user.tipo_Usuario.administrador) {
         tipo = "Administrador";
      } else if (user.tipo_Usuario.usuario) {
         tipo = "Usuario de escritorio";
      } else if (user.tipo_Usuario.usuario_web) {
         tipo = "Usuario Web";
      }
      return createData(user.nombre_Usuario, user.conttrasena_Usuario, tipo, user._id);
   });

   React.useEffect(() => {
      const getUsers = async () => {
         const usersResponse = await getAllUsers(token);
         const usersResponseData = usersResponse.data;
         console.log(usersResponseData);
         setAllUsers(usersResponseData);
      };
      getUsers();
   }, [openDeleteAlert]);

   const handleDeleteUser = async (id: string) => {
      const deleteUserResponse = await deleteUserById(token, id);
      if (deleteUserResponse) {
         setMessageSnackBar("El usuario fué eliminado.");
         setSeveritySnackBar("success");
         setOpenSnackBar(true);
      }
      setOpenDeleteAlert(false);
   };

   const handleOpen = () => setOpenModifyModal(true);

   const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   return (
      <Box>
         <Box sx={{ display: "flex", position: "absolute", right: "10%" }}>
            <Button variant="outlined" onClick={() => setOpenCreateModal(true)}>
               <Typography sx={{ m: 1 }}>Agregar usuario</Typography>
               <PersonAddIcon />
            </Button>
         </Box>
         <Box sx={{ display: "flex", alignContent: "center", justifyContent: "center", pt: 10 }}>
            <Paper sx={{ width: "90%", overflow: "hidden" }}>
               <TableContainer sx={{ maxHeight: 1300 }}>
                  <Table stickyHeader aria-label="sticky table">
                     <TableHead>
                        <TableRow>
                           {columns.map((column) => (
                              <>
                                 <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                                    <Typography sx={{ fontSize: "17px" }}>{column.label}</Typography>
                                 </TableCell>
                              </>
                           ))}
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                           return (
                              <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                 <TableCell>
                                    <Typography sx={{ fontSize: "17px" }}>{row.nombre_Usuario}</Typography>
                                 </TableCell>
                                 <TableCell>
                                    <Typography sx={{ fontSize: "17px" }}>{row.tipo_Usuario}</Typography>
                                 </TableCell>
                                 <TableCell>
                                    <Button onClick={() => handleOpen()}>
                                       <BorderColorIcon />
                                    </Button>
                                 </TableCell>
                                 <TableCell>
                                    <Button
                                       onClick={() =>
                                          users.findIndex((e) => {
                                             console.log(e);
                                             if (e._id === row._id) {
                                                setUser(e);
                                             }
                                             setOpenDeleteAlert(true);
                                          })
                                       }
                                    >
                                       <DeleteForeverIcon />
                                    </Button>
                                 </TableCell>
                              </TableRow>
                           );
                        })}
                     </TableBody>
                  </Table>
               </TableContainer>
               <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
               />
               <UsersModal isModify={true} open={openModifyModal} setOpen={setOpenModifyModal} onConfirm={() => {}} />
               <UsersModal isModify={false} open={openCreateModal} setOpen={setOpenCreateModal} onConfirm={() => {}} />
               <AlertDialog
                  head={"¿Está seguro de que desea eliminar al usuario?"}
                  message={"Si se continúa, se eliminará todos los datos del usuario."}
                  open={openDeleteAlert}
                  setOpen={setOpenDeleteAlert}
                  onConfirm={() => handleDeleteUser(user._id)}
               />
               <AlertSnackBar
                  open={openSnackBar}
                  setOpen={setOpenSnackBar}
                  message={messageSnackBar}
                  severity={severitySnackBar}
               />
            </Paper>
         </Box>
      </Box>
   );
}
