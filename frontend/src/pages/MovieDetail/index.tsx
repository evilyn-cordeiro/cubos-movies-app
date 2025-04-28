import {
  Box,
  Typography,
  useTheme,
  CircularProgress,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AddMovieDrawer } from "../../components/MovieForm";
import { EditFormMovie } from "../../utils/moviesInterface";
import { deleteMovieById, fetchMovieById } from "../../services/movieServices";

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const [movie, setMovie] = useState<EditFormMovie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const overlayColor =
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 1)"
      : "rgba(255, 255, 255, 1)";

  const fetchMovie = async () => {
    try {
      const data = await fetchMovieById(id!);
      setMovie(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteMovieById(id!);
      setDeleteDialogOpen(false);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleMovieUpdated = async () => {
    setIsEditing(false);
    await fetchMovie();
  };

  if (loading || !movie) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 10,
        minHeight: "80vh",
        width: "100%",
        maxWidth: "1366px",
        padding: "16px",
        mx: "auto",
      }}
    >
      <Box
        sx={{
          position: "relative",
          backgroundImage: `
          linear-gradient(to top, ${overlayColor}, transparent),
          ${movie.imageUrl}
        `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: 2,
          overflow: "hidden",
          padding: 2,
          minHeight: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backdropFilter: "brightness(0.5)",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          gap={4}
        >
          <Box
            component="img"
            src={movie.imageUrl || "src/assets/movie-default.png"}
            alt={movie.title}
            sx={{
              width: { xs: "100%", md: "300px" },
              height: { xs: "auto", md: "450px" },
              objectFit: "cover",
              borderRadius: "8px",
              flexShrink: 0,
            }}
          />
          <Box flex={1} color="white">
            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              alignItems="flex-start"
              justifyContent={{ xs: "center", md: "flex-start" }}
              gap={2}
            >
              <Box
                display="flex"
                width="100%"
                flexDirection={{ xs: "row", md: "row" }}
                gap={1}
                mt={{ xs: 2, md: 0 }}
              >
                <Button
                  sx={{ width: "91px" }}
                  variant="outlined"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  Deletar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: { sm: "91px", xs: "100%" } }}
                  onClick={() => setIsEditing(true)}
                >
                  Editar
                </Button>
              </Box>
            </Box>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="h5" gutterBottom>
              Título Original: {movie.originalTitle}
            </Typography>

            <Box mt={2} mb={2}>
              <Chip
                label={movie.genre}
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.contrastText,
                  fontWeight: "bold",
                }}
              />
            </Box>

            <Typography variant="body1" mb={2}>
              {movie.description}
            </Typography>

            <Typography variant="body2">
              <strong>Orçamento:</strong>{" "}
              {movie.budget?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Typography>

            <Typography variant="body2">
              <strong>Duração:</strong> {movie.duration} minutos
            </Typography>

            <Typography variant="body2">
              <strong>Data de Lançamento:</strong>{" "}
              {new Date(movie.releaseDate).toLocaleDateString("pt-BR")}
            </Typography>
          </Box>
        </Box>

        {movie.youtubeUrl && (
          <Box mt={6}>
            <Typography variant="h5" mb={2} color="white">
              Trailer
            </Typography>
            <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
              <Box
                component="iframe"
                src={`https://www.youtube.com/embed/${movie.youtubeUrl}`}
                title="Trailer do Filme"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: "8px",
                }}
              />
            </Box>
          </Box>
        )}
      </Box>

      {/* Drawer de edição */}
      <AddMovieDrawer
        movieId={movie.id}
        open={isEditing}
        onClose={() => setIsEditing(false)}
        onMovieAdded={handleMovieUpdated}
        movieToEdit={movie}
      />

      {/* Modal de confirmação de exclusão */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir <strong>{movie.title}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleDelete} color="error">
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MovieDetailPage;
