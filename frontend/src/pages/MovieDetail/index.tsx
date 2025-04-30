import { Box, Typography, useTheme, Chip, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AddMovieDrawer } from "../../components/MovieForm";
import { EditFormMovie } from "../../utils/moviesInterface";
import RemoveDialog from "../../components/RemoveDialog";
import InfoCard from "../../components/InfoCard";
import { enqueueSnackbar } from "notistack";
import { movieService } from "../../services/movieServices";

const MovieDetailPage = () => {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<EditFormMovie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const fetchMovie = async () => {
    try {
      const data = await movieService.fetchMovieById(id!);
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
      await movieService.deleteMovieById(id!);
      setDeleteDialogOpen(false);
      enqueueSnackbar("Filme deletado!", {
        variant: "success",
      });
      navigate("/");
    } catch (error) {
      enqueueSnackbar(
        `${error}: Erro ao deletar Filme. Tente novamente mais tarte`,
        {
          variant: "error",
        }
      );
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
        width: "100%",
        maxWidth: "1366px",
        padding: "16px",
        mx: "auto",
      }}
    >
      <Box
        sx={{
          position: "relative",
          borderRadius: 2,
          padding: 2,
          minHeight: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          zIndex: 99,
          color: "white",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -2,
            backgroundImage: `linear-gradient(
        to bottom right,
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.5)
      ), url(${movie.imageUrl || "src/assets/movie-default.png"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.7,
          }}
        />
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={4}
          flexWrap="wrap"
        >
          {/* Imagem */}
          <Box
            display="flex"
            flexDirection={{ xs: "column-reverse", md: "column" }}
            alignItems={{ xs: "center", md: "flex-start" }}
            gap={2}
          >
            <Box
              component="img"
              src={movie.imageUrl || "src/assets/movie-default.png"}
              alt={movie.title}
              sx={{
                width: { md: "374px", xs: "382px" },
                height: "582px",
                objectFit: "cover",
                borderRadius: 1,
              }}
            />
          </Box>

          {/* Conteúdo principal */}
          <Box flex={1} display="flex" flexDirection="column" gap={2}>
            {/* Título e Ações */}
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection={{ xs: "column", md: "row" }}
              gap={2}
            >
              <Box textAlign={{ xs: "center", md: "start" }}>
                <Typography variant="h4" fontWeight={600}>
                  {movie.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Título Original: {movie.originalTitle}
                </Typography>
              </Box>
              <Box
                display="flex"
                gap={1}
                justifyContent={{ xs: "center", md: "flex-end" }}
              >
                <Button
                  variant="outlined"
                  sx={{ width: 91, height: 44 }}
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  Deletar
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    width: { xs: "100%", md: 82 },
                    maxWidth: "283px",
                    height: 44,
                  }}
                  onClick={() => setIsEditing(true)}
                >
                  Editar
                </Button>
              </Box>
            </Box>

            {/* Tagline e Métricas */}
            <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
              <Typography
                variant="body2"
                textAlign={{ xs: "center", md: "left" }}
                sx={{ fontStyle: "italic", color: "text.primary", flex: 1 }}
              >
                {movie.tagline || "Nenhuma tagline inserda."}
              </Typography>

              {[
                ["POPULARIDADE", movie.popularity],
                ["VOTOS", movie.voteCount],
              ].map(([label, value], i) => (
                <Box
                  key={i}
                  maxWidth={"130px"}
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(0,0,0,0.5)",
                    padding: 2,
                    borderRadius: 1,
                    flex: "1",
                  }}
                >
                  <Typography variant="h6">{label}</Typography>
                  <Typography fontWeight="bold">{value}</Typography>
                </Box>
              ))}

              <Box
                sx={{
                  position: "relative",
                  width: { xs: 60, sm: 80, md: 100 },
                  height: { xs: 60, sm: 80, md: 100 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress
                  variant="determinate"
                  value={movie.popularity}
                  size="100%"
                  thickness={3}
                  sx={{
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "50%",
                    "& .MuiCircularProgress-circle": {
                      stroke: "#FFE000",
                    },
                  }}
                />
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography
                    variant="h6"
                    fontSize={{ xs: "0.75rem", sm: "1rem", md: "1.25rem" }}
                    color="#FFE000"
                    fontWeight="bold"
                  >
                    {`${Math.round(movie.popularity || 0)}%`}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Detalhes */}
            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              gap={2}
            >
              {/* Sinopse e Gêneros */}
              <Box
                flex={1}
                display="flex"
                flexDirection="column"
                gap={2}
                maxWidth={"416px"}
              >
                {[
                  {
                    title: "SINOPSE",
                    content: (
                      <Typography textAlign="justify" minHeight={"212px"}>
                        {movie.description}
                      </Typography>
                    ),
                  },
                  {
                    title: "GÊNEROS",
                    content: (
                      <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                        {movie.genre.split(",").map((g, i) => (
                          <Chip
                            key={i}
                            label={g.trim()}
                            sx={{
                              backgroundColor: theme.palette.secondary.main,
                              color: theme.palette.primary.contrastText,
                              fontWeight: "bold",
                              borderRadius: 1,
                              fontSize: "14px",
                            }}
                          />
                        ))}
                      </Box>
                    ),
                  },
                ].map(({ title, content }, i) => (
                  <Box
                    key={i}
                    sx={{
                      p: 2,
                      borderRadius: 1,
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,0,0,0.5)",
                    }}
                  >
                    <Typography variant="h6">{title}</Typography>
                    {content}
                  </Box>
                ))}
              </Box>

              {/* Informações Adicionais */}
              <Box flex={1} display="flex" flexDirection="column" gap={2}>
                {/* Linha 1 */}
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(2, 1fr)"
                  gap={2}
                >
                  {[
                    {
                      label: "DURAÇÃO",
                      value: `${Math.floor(movie.duration / 60)}h ${
                        movie.duration % 60
                      }m`,
                    },
                    { label: "SITUAÇÃO", value: movie.status },
                    { label: "IDIOMA", value: movie.language },
                    {
                      label: "LANÇAMENTO",
                      value: new Date(movie.releaseDate).toLocaleDateString(
                        "pt-BR"
                      ),
                    },
                  ].map(({ label, value }) => (
                    <InfoCard key={label} label={label} value={value} />
                  ))}
                </Box>

                {/* Linha 2 */}
                <Box
                  display="flex"
                  gap={2}
                  flexWrap="wrap"
                  justifyContent={"flex-end"}
                >
                  {[
                    {
                      label: "ORÇAMENTO",
                      value: movie.budget
                        ? movie.budget > 1_000_000
                          ? `${(movie.budget / 1_000_000).toFixed(1)} M`
                          : `${(movie.budget / 1000).toFixed(1)} K`
                        : "N/A",
                    },
                    {
                      label: "RECEITA",
                      value: movie.revenue
                        ? movie.revenue > 1_000_000
                          ? `${(movie.revenue / 1_000_000).toFixed(1)} M`
                          : `${(movie.revenue / 1000).toFixed(1)} K`
                        : "N/A",
                    },
                    {
                      label: "LUCRO",
                      value:
                        movie.revenue && movie.budget
                          ? `${(
                              (movie.revenue - movie.budget) /
                              1_000_000
                            ).toFixed(1)} M`
                          : "N/A",
                    },
                  ].map(({ label, value }) => (
                    <InfoCard key={label} label={label} value={value} />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
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
              src={movie.youtubeUrl.replace("watch?v=", "embed/")}
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

      <AddMovieDrawer
        movieId={movie.id}
        open={isEditing}
        onClose={() => setIsEditing(false)}
        onMovieAdded={handleMovieUpdated}
        movieToEdit={movie}
      />

      <RemoveDialog
        deleteDialogOpen={deleteDialogOpen}
        handleDelete={handleDelete}
        movieTitle={movie.title}
        setDeleteDialogOpen={setDeleteDialogOpen}
      />
    </Box>
  );
};

export default MovieDetailPage;
