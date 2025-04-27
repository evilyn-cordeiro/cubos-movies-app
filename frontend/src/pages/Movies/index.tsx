// Movies.tsx
import { useState, useEffect } from "react";
import { MovieList } from "../../components/MovieList";
import { AddMovieDrawer } from "../../components/MovieForm";

interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  description: string;
  budget: number;
  releaseDate: string;
  duration: number;
  genre: string;
  imageUrl: string | null;
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

  const fetchMovies = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:3000/movies?page=${page}`,
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
    fetchMovies();
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
          fetchMovies();
          setOpenDrawer(false);
        }}
      />
    </>
  );
};

export default Movies;
