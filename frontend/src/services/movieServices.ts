import axios from "axios";
import { EditFormMovie, MovieFormData } from "../utils/moviesInterface";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Adiciona o token em todas as requisições automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const movieService = {
  addMovie: async (data: MovieFormData) => {
    const response = await api.post("/movies", data);
    return response.data;
  },

  editMovie: async (data: EditFormMovie) => {
    const response = await api.post("/movies", data);
    return response.data;
  },

  fetchMovieById: async (id: string): Promise<EditFormMovie> => {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  },

  deleteMovieById: async (id: string): Promise<void> => {
    await api.delete(`/movies/${id}`);
  },

  fetchMovies: async (
    pageNumber: number,
    searchQuery: string,
    appliedFilters: {
      minDuration: string;
      maxDuration: string;
      startDate: string;
      endDate: string;
    }
  ) => {
    const params = {
      page: pageNumber.toString(),
      search: searchQuery,
      minDuration: appliedFilters.minDuration,
      maxDuration: appliedFilters.maxDuration,
      startDate: appliedFilters.startDate,
      endDate: appliedFilters.endDate,
    };

    const response = await api.get("/movies", { params });
    return response.data;
  },
};
