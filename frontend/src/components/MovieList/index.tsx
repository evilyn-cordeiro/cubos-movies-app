// MovieList.tsx
import { Box, Grid, Button, Modal, Pagination, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { MovieCard } from "../MovieCard";
import { useState } from "react";
import { useTheme } from "@mui/material";

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
}

export const MovieList = ({
  movies,
  search,
  page,
  setPage,
  onAddMovieClick,
}: MovieListProps) => {
  const itemsPerPage = 10;
  const theme = useTheme();

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedMovies = filteredMovies.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const [openFilter, setOpenFilter] = useState<boolean>(false);

  return (
    <Box
      minHeight="100vh"
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      px={4}
      pt={4}
      marginTop={"5rem"}
    >
      <Box width="100%" maxWidth="1500px">
        <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
          <Box
            component={InputBase}
            placeholder="Pesquise por filmes"
            value={search}
            sx={{
              maxWidth: 488,
              width: "100%",
              px: 2,
              py: 1,
              border: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
            }}
            endAdornment={
              <SearchIcon sx={{ color: theme.palette.text.primary, ml: 1 }} />
            }
          />
          <Button
            variant="contained"
            sx={{
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
          <Button variant="contained" onClick={onAddMovieClick}>
            Adicionar Filme
          </Button>
        </Box>

        <Grid
          container
          spacing={2}
          sx={{ backgroundColor: "#ebeaf81d", padding: 2, borderRadius: 2 }}
        >
          {paginatedMovies.map((movie) => (
            <Grid key={movie.id}>
              <MovieCard
                title={movie.title}
                genres={movie.genre}
                posterUrl={movie.imageUrl}
              />
            </Grid>
          ))}
        </Grid>

        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={Math.ceil(filteredMovies.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      </Box>

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
          {/* Conteúdo do Filtro aqui */}
          Filtro aqui!
        </Box>
      </Modal>
    </Box>
  );
};
