import { Box, Typography, useTheme } from "@mui/material";

const NotFile = () => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={8}
      textAlign="center"
    >
      <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
        Nenhum filme encontrado
      </Typography>
      <Typography
        mb={2}
        variant="body1"
        sx={{ color: theme.palette.text.primary }}
      >
        Não há filmes para listar. Que tal adicionar um novo?
      </Typography>
    </Box>
  );
};

export default NotFile;
