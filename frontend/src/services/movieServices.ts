import axios from "axios";
import { EditFormMovie, MovieFormData } from "../utils/moviesInterface";

const BASE_URL = "http://localhost:3000";

export const addMovie = async (data: MovieFormData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(`${BASE_URL}/movies`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const editMovie = async (data: EditFormMovie) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(`${BASE_URL}/movies/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const fetchMovieById = async (id: string): Promise<EditFormMovie> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/movies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Não autorizado");
  }

  if (!response.ok) {
    throw new Error("Erro ao buscar filme");
  }

  return await response.json();
};

export const deleteMovieById = async (id: string): Promise<void> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/movies/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar filme");
  }
};
