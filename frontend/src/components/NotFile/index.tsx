import { Box, Typography } from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";

const NotFile = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={8}
      textAlign="center"
    >
      <MovieCreationIcon
        sx={{
          fontSize: 64,
          mb: 2,
        }}
      />
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: "rgba(255, 255, 255, 0.87)" }}
      >
        Nenhum filme encontrado
      </Typography>
      <Typography
        variant="body2"
        mb={2}
        sx={{ color: "rgba(255, 255, 255, 0.87)" }}
      >
        Não há filmes para listar. Que tal adicionar um novo?
      </Typography>
    </Box>
  );
};

export default NotFile;
