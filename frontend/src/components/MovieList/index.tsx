import {
  useTheme,
  Box,
  Button,
  Modal,
  Pagination,
  InputBase,
  Typography,
  Skeleton,
} from "@mui/material";
import { useState } from "react";
import MovieCard from "../MovieCard";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { SearchIcon } from "../Icons";

interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  description: string;
  budget: number;
  releaseDate: string;
  duration: number;
  genre: string;
  imageUrl?: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface MovieListProps {
  movies: Movie[];
  search: string;
  setSearch: (value: string) => void;
  page: number;
  setPage: (value: number) => void;
  onAddMovieClick: () => void;
  totalPages: number;
}

const MovieList = ({
  movies,
  search,
  setSearch,
  page,
  setPage,
  onAddMovieClick,
  totalPages,
}: MovieListProps) => {
  const theme = useTheme();
  const [openFilter, setOpenFilter] = useState(false);

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const isLoading = false;

  return (
    <Box
      sx={{
        mt: 15,
        minHeight: "500px",
        width: "100%",
        maxWidth: "1366px",
        padding: "16px",
      }}
    >
      <Box
        display="flex"
        justifyContent={{ xs: "center", sm: "flex-end" }}
        gap={{ xs: 2, sm: "10px" }}
        flexWrap="wrap"
        mb={3}
      >
        <InputBase
          placeholder="Pesquise por filmes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            maxWidth: { xs: "100%", sm: "488px" },
            px: 2,
            py: 1,
            border: "1px solid #49474E",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
          }}
          endAdornment={<SearchIcon />}
        />

        <Box
          width={{ xs: "100%", sm: "auto" }}
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          gap={{ xs: "2.33px", sm: "10px" }}
        >
          <Button
            variant="contained"
            sx={{
              width: { xs: "40%", sm: "85px" },
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
            onClick={() => setOpenFilter(true)}
          >
            Filtros
          </Button>

          <Button
            variant="contained"
            sx={{ width: { xs: "242.93px", sm: "151px" } }}
            onClick={onAddMovieClick}
          >
            Adicionar Filme
          </Button>
        </Box>
      </Box>

      <Box
        sx={(theme) => ({
          display: "grid",
          gap: "8px",
          rowGap: "16px",
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(0, 0, 0, 0.238)",
          padding: { sm: "24px", xs: "16px" },
          borderRadius: "4px",
          minHeight: "500px",
          gridTemplateColumns: "repeat(auto-fit, minmax(235px, 1fr))",

          [theme.breakpoints.down(730)]: {
            gridTemplateColumns: "repeat(auto-fit, minmax(183px, 1fr))",
          },
        })}
      >
        {isLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton
              key={idx}
              variant="rectangular"
              height={300}
              sx={{ borderRadius: 2 }}
            />
          ))
        ) : movies.length === 0 ? (
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
        ) : (
          movies.map((movie) => (
            <Box key={movie.id} display="flex" justifyContent="center">
              <MovieCard
                title={movie.title}
                genres={movie.genre}
                posterUrl={movie.imageUrl}
              />
            </Box>
          ))
        )}
      </Box>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4} mb={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            sx={{
              "& .MuiPaginationItem-root": {
                width: 50,
                height: 50,
                borderRadius: 1,
                backgroundColor: theme.palette.primary.main,
                "&.Mui-selected": {
                  backgroundColor: theme.palette.background.paper,
                },
                "&.Mui-disabled": {
                  backgroundColor: theme.palette.action.disabledBackground,
                },
              },
            }}
          />
        </Box>
      )}

      <Modal open={openFilter} onClose={() => setOpenFilter(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          Filtro aqui!
        </Box>
      </Modal>
    </Box>
  );
};

export default MovieList;
