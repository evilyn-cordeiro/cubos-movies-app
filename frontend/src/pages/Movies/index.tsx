import { useState, useEffect } from "react";
import { AddMovieDrawer } from "../../components/MovieForm";
import { MovieList } from "../../components";
import { Movie } from "../../utils/moviesInterface";
import { movieService } from "../../services/movieServices";

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    minDuration: "",
    maxDuration: "",
    startDate: "",
    endDate: "",
  });

  const handleFiltersApply = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1);
    fetchMovies(1, search, newFilters);
  };

  const fetchMovies = async (
    pageNumber: number,
    searchQuery: string,
    appliedFilters = filters
  ) => {
    try {
      const data = await movieService.fetchMovies(
        pageNumber,
        searchQuery,
        appliedFilters
      );
      setMovies(data.movies);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  useEffect(() => {
    fetchMovies(page, search, filters);
  }, [page, search, filters]);

  return (
    <>
      <MovieList
        movies={movies}
        search={search}
        setSearch={setSearch}
        page={page}
        setPage={setPage}
        onAddMovieClick={() => setOpenDrawer(true)}
        totalPages={totalPages}
        onFiltersApply={handleFiltersApply}
      />

      <AddMovieDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onMovieAdded={() => {
          fetchMovies(1, search);
          setPage(1);
          setOpenDrawer(false);
        }}
      />
    </>
  );
};

export default Movies;
