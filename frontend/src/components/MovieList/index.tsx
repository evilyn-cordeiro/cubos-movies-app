import { Box, Button, Modal, Pagination, InputBase } from "@mui/material";
import { useTheme } from "@mui/material";
import { useState } from "react";
import { MovieCard } from "../MovieCard";

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
  setSearch,
  page,
  setPage,
  onAddMovieClick,
}: MovieListProps) => {
  const theme = useTheme();
  const [openFilter, setOpenFilter] = useState(false);
  const itemsPerPage = 10;

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
          endAdornment={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18ZM11 6C10.3434 6 9.69321 6.12933 9.08658 6.3806C8.47995 6.63188 7.92876 7.00017 7.46447 7.46447C7.00017 7.92876 6.63188 8.47996 6.3806 9.08658C6.12933 9.69321 6 10.3434 6 11C6 11.5523 6.44772 12 7 12C7.55228 12 8 11.5523 8 11C8 10.606 8.0776 10.2159 8.22836 9.85195C8.37913 9.48797 8.6001 9.15726 8.87868 8.87868C9.15726 8.6001 9.48797 8.37913 9.85195 8.22836C10.2159 8.0776 10.606 8 11 8C11.5523 8 12 7.55228 12 7C12 6.44772 11.5523 6 11 6Z"
                fill={theme.palette.text.primary}
              />
              <path
                d="M20 20L18 18"
                stroke={theme.palette.text.primary}
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          }
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
            sx={{
              width: { xs: "242.93px", sm: "151px" },
            }}
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
        {paginatedMovies.map((movie) => (
          <Box key={movie.id} display="flex" justifyContent="center">
            <MovieCard
              title={movie.title}
              genres={movie.genre}
              posterUrl={movie.imageUrl}
            />
          </Box>
        ))}
      </Box>

      {/* Paginação */}
      <Box display="flex" justifyContent="center" mt={4} marginBottom={4}>
        <Pagination
          count={Math.ceil(filteredMovies.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          sx={{
            "& .MuiPaginationItem-root": {
              width: 50,
              height: 50,
              borderRadius: 1,
            },
          }}
        />
      </Box>

      {/* Modal de Filtros */}
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
