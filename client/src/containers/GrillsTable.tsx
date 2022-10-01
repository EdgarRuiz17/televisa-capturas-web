import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getAllProgrammations } from "../backend/backendRequests";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PreviewIcon from "@mui/icons-material/Preview";
import { Button, Typography } from "@mui/material";
import GrillsModal from "../components/GrillsModal";
import AlertDialog from "../components/AlertDialog";

interface Data {
   fecha: string;
   id: string;
}

const columns = [
   { id: "Inicio/Fin", label: "Inicio/Fin", minWidth: 30 },
   { id: "detalles", label: "Ver detalles", minWidth: 30 },
   { id: "modificar", label: "Modificar", minWidth: 30 },
   { id: "eliminar", label: "Eliminar", minWidth: 30 },
];

function createData(semana_inicio: string, semana_fin: string, id: string): Data {
   return {
      fecha: semana_inicio + " - " + semana_fin,
      id: id,
   };
}

export default function StickyHeadTable() {
   const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);
   const [openModifyModal, setOpenModifyModal] = React.useState(false);
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(5);
   const [programmations, setProgrammations] = React.useState([]);

   const rows = programmations.map((programmation: any) => {
      return createData(programmation.semana_Inicio, programmation.semana_Fin, programmation.id);
   });

   React.useEffect(() => {
      const getProgrammations = async () => {
         const programmationsResponse = await getAllProgrammations();
         const programmationsResponseData = programmationsResponse.data;
         console.log(programmationsResponseData);
         setProgrammations(programmationsResponseData);
      };
      getProgrammations();
   }, []);

   const handleOpen = () => setOpenModifyModal(true);

   const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   return (
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
                        <TableRow hover role="checkbox" tabIndex={-1} key={i} onClick={() => console.log(row.id)}>
                           <TableCell>
                              <Typography sx={{ fontSize: "17px" }}>{row.fecha}</Typography>
                           </TableCell>
                           <TableCell>
                              <Button>
                                 <PreviewIcon />
                              </Button>
                           </TableCell>
                           <TableCell>
                              <Button onClick={() => handleOpen()}>
                                 <BorderColorIcon />
                              </Button>
                           </TableCell>
                           <TableCell>
                              <Button onClick={() => setOpenDeleteAlert(true)}>
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
         <GrillsModal idModify={true} open={openModifyModal} setOpen={setOpenModifyModal} />
         <AlertDialog
            head={"¿Está seguro de que desea eliminar la programación semanal?"}
            message={"Si se continúa, se eliminará la programación y también los programas que este tenga."}
            open={openDeleteAlert}
            setOpen={setOpenDeleteAlert}
         />
      </Paper>
   );
}
