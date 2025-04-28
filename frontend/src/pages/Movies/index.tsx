import { useState, useEffect } from "react";
import { AddMovieDrawer } from "../../components/MovieForm";
import { MovieList } from "../../components";
import { Movie, MoviesResponse } from "../../utils/moviesInterface";

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
    const token = localStorage.getItem("token");

    const params = new URLSearchParams({
      page: pageNumber.toString(),
      search: searchQuery,
      minDuration: appliedFilters.minDuration,
      maxDuration: appliedFilters.maxDuration,
      startDate: appliedFilters.startDate,
      endDate: appliedFilters.endDate,
    });

    try {
      const response = await fetch(`http://localhost:3000/movies?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const data: MoviesResponse = await response.json();
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
