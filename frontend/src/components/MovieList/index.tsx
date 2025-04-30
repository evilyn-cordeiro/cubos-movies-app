import {
  useTheme,
  Box,
  Button,
  Modal,
  Pagination,
  InputBase,
  Skeleton,
} from "@mui/material";
import { useState } from "react";
import MovieCard from "../MovieCard";
import { SearchIcon } from "../Icons";
import NotFile from "../NotFile";
import FilterModal from "../FIlterModal";

interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  description: string;
  budget: number;
  releaseDate: string | Date;
  duration: number;
  genre: string;
  successRate: number;
  popularity?: number;
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
  onFiltersApply: (filters: Filters) => void;
}

interface Filters {
  minDuration: string;
  maxDuration: string;
  startDate: string;
  endDate: string;
}

const MovieList = ({
  movies,
  search,
  page,
  setSearch,
  setPage,
  onAddMovieClick,
  totalPages,
  onFiltersApply,
}: MovieListProps) => {
  const theme = useTheme();
  const [openFilter, setOpenFilter] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    minDuration: "",
    maxDuration: "",
    startDate: "",
    endDate: "",
  });

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleFilterChange = (field: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleClearFilters = () => {
    const cleared = {
      minDuration: "",
      maxDuration: "",
      startDate: "",
      endDate: "",
    };
    setFilters(cleared);
    onFiltersApply(cleared);
    setOpenFilter(false);
  };

  const handleApplyFilters = () => {
    onFiltersApply(filters);
    setOpenFilter(false);
  };

  const isLoading = false;

  return (
    <Box
      sx={{
        mt: 10,
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

      {isLoading ? (
        <Box
          sx={{
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
            gridTemplateColumns: "repeat(auto-fill, minmax(235px, 1fr))",
            [theme.breakpoints.down(600)]: {
              gridTemplateColumns: "repeat(auto-fill, minmax(183px, 1fr))",
            },
          }}
        >
          {Array.from({ length: 5 }).map((_, idx) => (
            <Box
              key={idx}
              sx={(theme) => ({
                width: { xs: "100%", sm: "235px" },
                height: "100%",
                maxHeight: "355px",
                borderRadius: "4px",
                overflow: "hidden",
                bgcolor: "background.paper",
                mx: "auto",
                [theme.breakpoints.down("sm")]: {
                  width: "183px",
                  height: "281px",
                },
              })}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "4px",
                }}
              />
            </Box>
          ))}
        </Box>
      ) : movies.length === 0 ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="400px"
          sx={{
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.282)",
            borderRadius: "4px",
            mt: 3,
          }}
        >
          <NotFile />
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gap: "8px",
            rowGap: { sm: "24px", xs: "16px" },
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.282)",
            padding: { sm: "24px", xs: "16px" },
            borderRadius: "4px",
            gridTemplateColumns: "repeat(auto-fill, minmax(235px, 1fr))",
            [theme.breakpoints.down(414)]: {
              gridTemplateColumns: "repeat(auto-fill, minmax(183px, 1fr))",
            },
          }}
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              genre={movie.genre}
              successRate={movie.successRate}
              posterUrl={movie.imageUrl}
            />
          ))}
        </Box>
      )}

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
                color: theme.palette.primary.contrastText,
                "&.Mui-selected": {
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.primary.main,
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
        <FilterModal
          filters={filters}
          onChange={handleFilterChange}
          onClear={handleClearFilters}
          onApply={handleApplyFilters}
        />
      </Modal>
    </Box>
  );
};

export default MovieList;
