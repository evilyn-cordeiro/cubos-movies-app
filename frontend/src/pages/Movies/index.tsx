// Movies.tsx
import { useState, useEffect } from "react";
import { AddMovieDrawer } from "../../components/MovieForm";
import { MovieList } from "../../components";

interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  description: string;
  budget: number;
  releaseDate: string;
  duration: number;
  genre: string;
  imageUrl: string | undefined;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface MoviesResponse {
  movies: Movie[];
  totalMovies: number;
  totalPages: number;
  currentPage: number;
}

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [openDrawer, setOpenDrawer] = useState(false);

  const fetchMovies = async (pageNumber: number) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:3000/movies?page=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const data: MoviesResponse = await response.json();
      setMovies(data.movies);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };
  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  return (
    <>
      <MovieList
        movies={movies}
        search={search}
        setSearch={setSearch}
        page={page}
        setPage={setPage}
        onAddMovieClick={() => setOpenDrawer(true)}
      />

      <AddMovieDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onMovieAdded={() => {
          fetchMovies(1);
          setPage(1);
          setOpenDrawer(false);
        }}
      />
    </>
  );
};

export default Movies;
