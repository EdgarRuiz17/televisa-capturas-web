import { Box, Typography } from "@mui/material";

export const IdleScreen = () => {
   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 50,
            flexDirection: "column",
         }}
      >
         <Box
            component={"img"}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Logotipo_de_Televisa.svg/1200px-Logotipo_de_Televisa.svg.png"
            width={200}
         />
         <Typography sx={{ p: 2 }} fontWeight="700">
            Bienvenido al sistema de gestión de parrillas.
         </Typography>
         <Typography sx={{ p: 2 }} fontWeight="500">
            Favor de navegar con el menu de la parte izquierda.
         </Typography>
      </Box>
   );
};
